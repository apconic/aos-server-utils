"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodParams {
    constructor(target, path, propertyKey, role, isSecure = true) {
        this.target = target;
        this.path = path;
        this.propertyKey = propertyKey;
        this.role = role;
        this.isSecure = isSecure;
    }
}
exports.default = MethodParams;
