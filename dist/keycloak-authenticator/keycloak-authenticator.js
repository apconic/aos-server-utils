"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jws_1 = __importDefault(require("jws"));
// @ts-ignore
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
class KeycloakAuthenticator {
    constructor(config) {
        this.authenticator = new keycloak_connect_1.default({}, config);
    }
    getAuthenticator() {
        return this.authenticator;
    }
    getUser(token) {
        const payload = jws_1.default.decode(token).payload;
        if (!payload || !payload.preferred_username) {
            return null;
        }
        return payload.preferred_username;
    }
}
exports.KeycloakAuthenticator = KeycloakAuthenticator;
