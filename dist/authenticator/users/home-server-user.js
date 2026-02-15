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
var _HomeServerUser_preferredUsername, _HomeServerUser_businessUnits, _HomeServerUser_transporterCode, _HomeServerUser_userType, _HomeServerUser_currentBusinessUnit, _HomeServerUser_roles;
import { UserTypes } from './constants.js';
class HomeServerUser {
    constructor(userDetails) {
        _HomeServerUser_preferredUsername.set(this, void 0);
        _HomeServerUser_businessUnits.set(this, void 0);
        _HomeServerUser_transporterCode.set(this, void 0);
        _HomeServerUser_userType.set(this, void 0);
        _HomeServerUser_currentBusinessUnit.set(this, void 0);
        _HomeServerUser_roles.set(this, void 0);
        __classPrivateFieldSet(this, _HomeServerUser_preferredUsername, userDetails.preferredUsername, "f");
        __classPrivateFieldSet(this, _HomeServerUser_businessUnits, userDetails.businessUnits ?? [], "f");
        __classPrivateFieldSet(this, _HomeServerUser_userType, userDetails.type || UserTypes.Normal, "f");
        __classPrivateFieldSet(this, _HomeServerUser_transporterCode, userDetails.transporterCode, "f");
        __classPrivateFieldSet(this, _HomeServerUser_currentBusinessUnit, userDetails.currentBusinessUnit, "f");
        __classPrivateFieldSet(this, _HomeServerUser_roles, userDetails.roles ?? [], "f");
    }
    get transporterCode() {
        return __classPrivateFieldGet(this, _HomeServerUser_transporterCode, "f");
    }
    get currentBU() {
        return __classPrivateFieldGet(this, _HomeServerUser_currentBusinessUnit, "f");
    }
    get userType() {
        return __classPrivateFieldGet(this, _HomeServerUser_userType, "f");
    }
    get username() {
        return __classPrivateFieldGet(this, _HomeServerUser_preferredUsername, "f");
    }
    isInBU(buCode) {
        return __classPrivateFieldGet(this, _HomeServerUser_businessUnits, "f").includes(buCode);
    }
    isTransporter() {
        return __classPrivateFieldGet(this, _HomeServerUser_userType, "f") === UserTypes.Transporter;
    }
    checkRole(roleName) {
        if (!__classPrivateFieldGet(this, _HomeServerUser_roles, "f").find((r) => r.name === roleName)) {
            return false;
        }
        return true;
    }
}
_HomeServerUser_preferredUsername = new WeakMap(), _HomeServerUser_businessUnits = new WeakMap(), _HomeServerUser_transporterCode = new WeakMap(), _HomeServerUser_userType = new WeakMap(), _HomeServerUser_currentBusinessUnit = new WeakMap(), _HomeServerUser_roles = new WeakMap();
export default HomeServerUser;
