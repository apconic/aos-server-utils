"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const index_js_1 = require("./users/index.js");
const lodash_1 = __importDefault(require("lodash"));
const { trim, isString } = lodash_1.default;
class HomeServerAuthenticator {
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
        return new index_js_1.HomeServerUser({
            currentBusinessUnit: currentBusinessUnitCode,
            preferredUsername,
            businessUnits,
            type,
            transporterCode,
            roles: userSessionInfo.roles,
        });
    }
    getCurrentBU(req, businessUnits) {
        const buCode = trim(req.headers['current-bu']);
        if (!isString(buCode) || buCode.length === 0) {
            throw new Error("'current-bu' not present");
        }
        if (!businessUnits.includes(buCode)) {
            throw new Error(`'BU:${buCode} not found in user's business units`);
        }
        return buCode;
    }
    getTransporterCode(userSessionInfo, userType) {
        const code = userSessionInfo.transporterCode;
        if (userType === index_js_1.UserTypes.Transporter) {
            if (!code) {
                throw new Error(`${userType} user has no 'transporterCode'`);
            }
            return code;
        }
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
}
exports.default = HomeServerAuthenticator;
