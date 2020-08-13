"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_errors_1 = require("../../custom-errors");
class AnonymousUser {
    constructor() {
        this.currentBusinessUnit = null;
    }
    get transporterCode() {
        return null;
    }
    set currentBU(buCode) {
        this.currentBusinessUnit = buCode;
    }
    get currentBU() {
        return this.currentBusinessUnit;
    }
    get userType() {
        return null;
    }
    get username() {
        return 'ANONYMOUS';
    }
    isInBU(buCode) {
        return true;
    }
    isTransporter() {
        return false;
    }
    checkRole(roleName) {
        throw new custom_errors_1.AccessDeniedError(`User does not have appropriate role: "${roleName}" to access resource`);
    }
}
exports.default = AnonymousUser;
