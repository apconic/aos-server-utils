"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
    httpCode() {
        return 404;
    }
    errorMessage() {
        return {
            result: 'ERROR',
            message: this.message,
        };
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
