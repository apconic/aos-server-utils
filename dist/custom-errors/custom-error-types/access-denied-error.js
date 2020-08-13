"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
class AccessDeniedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
    httpCode() {
        return 403;
    }
    errorMessage() {
        return {
            message: this.message,
        };
    }
}
exports.AccessDeniedError = AccessDeniedError;
