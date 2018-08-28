"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnknownUserError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, UnknownUserError.prototype);
    }
    httpCode() {
        return 403;
    }
    errorMessage() {
        return {
            message: 'User not found from request'
        };
    }
}
exports.UnknownUserError = UnknownUserError;
