"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _preferredUsername, _businessUnits, _transporterCode, _currentBusinessUnit, _userType, _roles;
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class MockUser {
    constructor(userDetails) {
        var _a, _b;
        _preferredUsername.set(this, void 0);
        _businessUnits.set(this, void 0);
        _transporterCode.set(this, void 0);
        _currentBusinessUnit.set(this, void 0);
        _userType.set(this, void 0);
        _roles.set(this, void 0);
        __classPrivateFieldSet(this, _preferredUsername, userDetails.preferredUsername);
        __classPrivateFieldSet(this, _businessUnits, (_a = userDetails.businessUnits) !== null && _a !== void 0 ? _a : []);
        __classPrivateFieldSet(this, _userType, userDetails.type || constants_1.UserTypes.Normal);
        __classPrivateFieldSet(this, _currentBusinessUnit, userDetails.currentBusinessUnit);
        __classPrivateFieldSet(this, _transporterCode, userDetails.transporterCode);
        __classPrivateFieldSet(this, _roles, (_b = userDetails.roles) !== null && _b !== void 0 ? _b : []);
    }
    get transporterCode() {
        return __classPrivateFieldGet(this, _transporterCode);
    }
    get currentBU() {
        return __classPrivateFieldGet(this, _currentBusinessUnit);
    }
    get userType() {
        return __classPrivateFieldGet(this, _userType);
    }
    get username() {
        return __classPrivateFieldGet(this, _preferredUsername);
    }
    isInBU(buCode) {
        return __classPrivateFieldGet(this, _businessUnits).includes(buCode);
    }
    isTransporter() {
        return __classPrivateFieldGet(this, _userType) === constants_1.UserTypes.Transporter;
    }
    checkRole(roleName) {
        return;
    }
}
exports.default = MockUser;
_preferredUsername = new WeakMap(), _businessUnits = new WeakMap(), _transporterCode = new WeakMap(), _currentBusinessUnit = new WeakMap(), _userType = new WeakMap(), _roles = new WeakMap();
