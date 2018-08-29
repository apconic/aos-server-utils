"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jws_1 = __importDefault(require("jws"));
// @ts-ignore
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
const inversify_1 = require("inversify");
let KeycloakAuthenticator = class KeycloakAuthenticator {
    constructor() {
        this.authenticator = new keycloak_connect_1.default({}, buildConfig());
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
};
KeycloakAuthenticator = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], KeycloakAuthenticator);
exports.KeycloakAuthenticator = KeycloakAuthenticator;
function buildConfig() {
    return {
        realm: process.env.KEYCLOAK_REALM,
        resource: process.env.KEYCLOAK_RESOURCE,
        'realm-public-key': process.env.KEYCLOAK_REALM_PUBLIC_KEY,
        'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL,
        'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED,
        'use-resource-role-mappings': process.env
            .KEYCLOAK_USE_RESOURCE_ROLE_MAPPINGS,
        'public-client': process.env.KEYCLOAK_PUBLIC_CLIENT,
        'enable-cors': process.env.KEYCLOAK_ENABLE_CORS,
        'cors-max-age': process.env.KEYCLOAK_CORS_MAX_AGE,
        'bearer-only': process.env.KEYCLOAK_BEARER_ONLY,
        'proxy-url': process.env.KEYCLOAK_PROXY_URL
    };
}
