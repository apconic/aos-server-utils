"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./users/index.js");
const lodash_1 = __importDefault(require("lodash"));
const { trim, isString } = lodash_1.default;
const home_server_authenticator_js_1 = __importDefault(require("./home-server-authenticator.js"));
class MockAuthenticator {
    getMiddleware() {
        return [(request, response, next) => next()];
    }
    async getUser(request) {
        const accessToken = this.getAccessToken(request);
        if (accessToken) {
            // User real authenticator when there's access token
            return new home_server_authenticator_js_1.default().getUser(request);
        }
        else {
            const preferredUsername = this.getUsername(request);
            const businessUnits = this.getBusinessUnits(request);
            const type = this.getType(request);
            const currentBusinessUnitCode = this.getCurrentBU(request, businessUnits);
            const transporterCode = this.getTransporterCode(request, type);
            return new index_js_1.MockUser({
                currentBusinessUnit: currentBusinessUnitCode,
                preferredUsername,
                businessUnits,
                type,
                transporterCode,
            });
        }
    }
    getCurrentBU(req, businessUnits) {
        let currentBU = trim(req.headers['current-bu']);
        if (!isString(currentBU) || currentBU.length === 0) {
            console.info("'current-bu' header not provided. Using value 'Primary'");
            currentBU = 'Primary';
        }
        if (!businessUnits.includes(currentBU)) {
            throw new Error(`'current-bu':${currentBU} not found in user's 'business-units':${businessUnits}`);
        }
        return currentBU;
    }
    getTransporterCode(request, userType) {
        const code = request.headers['transporter-code'];
        if (userType === index_js_1.UserTypes.Transporter) {
            if (!isString(code)) {
                throw new Error(`${userType} user has no 'transporter-code' header`);
            }
            return code;
        }
    }
    getType(request) {
        const type = request.headers['user-type'];
        if (!type) {
            console.info(`'user-type' header not provided. Using ${index_js_1.UserTypes.Normal}. Available values:${Object.values(index_js_1.UserTypes)}`);
            return index_js_1.UserTypes.Normal;
        }
        return type;
    }
    getUsername(request) {
        const name = request.headers['preferred-username'];
        if (!name) {
            console.info("'preferred-username' header not provided. Using 'MOCK-USER' as username");
            return 'MOCK-USER';
        }
        return name;
    }
    getBusinessUnits(request) {
        const businessUnits = request.headers['business-units'];
        if (!isString(businessUnits) || businessUnits.length === 0) {
            console.info("'business-units' header not provided. Using ['Primary'] business units");
            return ['Primary'];
        }
        return businessUnits.split(',').map((code) => trim(code));
    }
    getAccessToken(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        return authHeader.substring('Bearer '.length);
    }
}
exports.default = MockAuthenticator;
