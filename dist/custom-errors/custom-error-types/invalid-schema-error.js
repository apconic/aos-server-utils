"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSchemaError = void 0;
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
            result: 'ERROR',
            message: this.message,
        };
    }
}
exports.InvalidSchemaError = InvalidSchemaError;
