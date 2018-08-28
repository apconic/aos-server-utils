"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            message: 'Resource not found'
        };
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
