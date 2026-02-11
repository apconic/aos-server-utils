"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MockUser_preferredUsername, _MockUser_businessUnits, _MockUser_transporterCode, _MockUser_currentBusinessUnit, _MockUser_userType, _MockUser_roles;
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("./constants.js");
class MockUser {
    constructor(userDetails) {
        var _a, _b;
        _MockUser_preferredUsername.set(this, void 0);
        _MockUser_businessUnits.set(this, void 0);
        _MockUser_transporterCode.set(this, void 0);
        _MockUser_currentBusinessUnit.set(this, void 0);
        _MockUser_userType.set(this, void 0);
        _MockUser_roles.set(this, void 0);
        __classPrivateFieldSet(this, _MockUser_preferredUsername, userDetails.preferredUsername, "f");
        __classPrivateFieldSet(this, _MockUser_businessUnits, (_a = userDetails.businessUnits) !== null && _a !== void 0 ? _a : [], "f");
        __classPrivateFieldSet(this, _MockUser_userType, userDetails.type || constants_js_1.UserTypes.Normal, "f");
        __classPrivateFieldSet(this, _MockUser_currentBusinessUnit, userDetails.currentBusinessUnit, "f");
        __classPrivateFieldSet(this, _MockUser_transporterCode, userDetails.transporterCode, "f");
        __classPrivateFieldSet(this, _MockUser_roles, (_b = userDetails.roles) !== null && _b !== void 0 ? _b : [], "f");
    }
    get transporterCode() {
        return __classPrivateFieldGet(this, _MockUser_transporterCode, "f");
    }
    get currentBU() {
        return __classPrivateFieldGet(this, _MockUser_currentBusinessUnit, "f");
    }
    get userType() {
        return __classPrivateFieldGet(this, _MockUser_userType, "f");
    }
    get username() {
        return __classPrivateFieldGet(this, _MockUser_preferredUsername, "f");
    }
    isInBU(buCode) {
        return __classPrivateFieldGet(this, _MockUser_businessUnits, "f").includes(buCode);
    }
    isTransporter() {
        return __classPrivateFieldGet(this, _MockUser_userType, "f") === constants_js_1.UserTypes.Transporter;
    }
    checkRole(roleName) {
        return false;
    }
}
_MockUser_preferredUsername = new WeakMap(), _MockUser_businessUnits = new WeakMap(), _MockUser_transporterCode = new WeakMap(), _MockUser_currentBusinessUnit = new WeakMap(), _MockUser_userType = new WeakMap(), _MockUser_roles = new WeakMap();
exports.default = MockUser;
