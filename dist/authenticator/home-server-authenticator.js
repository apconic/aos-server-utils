"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const graphql_request_1 = require("graphql-request");
const users_1 = require("./users");
const lodash_1 = require("lodash");
const custom_error_types_1 = require("../custom-errors/custom-error-types");
let HomeServerAuthenticator = class HomeServerAuthenticator {
    constructor() {
        this.USER_SESSION_QUERY = `query UserSessionInfo($accessToken: String!) {
    userSessionInfo(accessToken: $accessToken) {
      userType
      businessUnits
      transporterCode
      username
      name
      roles {
        name
      }
    }
  }`;
    }
    getMiddleware() {
        return [(request, response, next) => next()];
    }
    async getUser(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new custom_error_types_1.InvalidSchemaError('Authorization bearer token not found in request header');
        }
        const accessToken = authHeader.substring('Bearer '.length);
        if (!accessToken) {
            throw new Error(`Authorization bearer token not found. Value:${authHeader}`);
        }
        if (!process.env.HOME_GRAPHQL_AUTHENTICATION_URL) {
            throw new Error('HOME_GRAPHQL_AUTHENTICATION_URL environment variable not found in .env. Refer example env.');
        }
        const graphqlClient = new graphql_request_1.GraphQLClient(process.env.HOME_GRAPHQL_AUTHENTICATION_URL);
        let response = null;
        try {
            response = await graphqlClient.request(this.USER_SESSION_QUERY, { accessToken });
        }
        catch (err) {
            console.error(err);
            throw new Error('Error encountered on session query of home server. Refer logs.');
        }
        const { userSessionInfo } = response !== null && response !== void 0 ? response : {};
        const preferredUsername = this.getUsername(userSessionInfo);
        const businessUnits = this.getBusinessUnits(userSessionInfo);
        const type = this.getType(userSessionInfo);
        const currentBusinessUnitCode = this.getCurrentBU(request, businessUnits);
        const transporterCode = this.getTransporterCode(userSessionInfo, type);
        return new users_1.HomeServerUser({
            currentBusinessUnit: currentBusinessUnitCode,
            preferredUsername,
            businessUnits,
            type,
            transporterCode,
            roles: userSessionInfo.roles,
        });
    }
    getCurrentBU(req, businessUnits) {
        const buCode = (0, lodash_1.trim)(req.headers['current-bu']);
        if (!(0, lodash_1.isString)(buCode) || buCode.length === 0) {
            throw new custom_error_types_1.InvalidSchemaError("'current-bu' not present in request header");
        }
        if (!businessUnits.includes(buCode)) {
            throw new custom_error_types_1.ResourceNotFoundError(`'BU:${buCode} not found in user's business units`);
        }
        return buCode;
    }
    getTransporterCode(userSessionInfo, userType) {
        const code = userSessionInfo.transporterCode;
        if (userType === users_1.UserTypes.Transporter && !code) {
            throw new Error(`${userType} user has no 'transporterCode'`);
        }
        return code !== null && code !== void 0 ? code : null;
    }
    getType(userSessionInfo) {
        if (!userSessionInfo.userType) {
            throw new Error("'userType' not found in userSessionInfo. Unknown user type");
        }
        return userSessionInfo.userType;
    }
    getUsername(userSessionInfo) {
        if (!(userSessionInfo === null || userSessionInfo === void 0 ? void 0 : userSessionInfo.username)) {
            console.error(`No user session found. Received response:${userSessionInfo}`);
            throw new Error('User has no session');
        }
        return userSessionInfo.username;
    }
    getBusinessUnits(userSessionInfo) {
        try {
            const businessUnits = userSessionInfo.businessUnits;
            if (!businessUnits) {
                return [];
            }
            return businessUnits;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
};
HomeServerAuthenticator = __decorate([
    (0, inversify_1.injectable)()
], HomeServerAuthenticator);
exports.default = HomeServerAuthenticator;
