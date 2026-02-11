"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return false;
    }
}
exports.default = AnonymousUser;
