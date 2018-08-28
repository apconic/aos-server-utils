"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidSchemaError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, InvalidSchemaError.prototype);
    }
    httpCode() {
        return 400;
    }
    errorMessage() {
        return {
            message: 'Invalid request. Schema validation failed.'
        };
    }
}
exports.InvalidSchemaError = InvalidSchemaError;
