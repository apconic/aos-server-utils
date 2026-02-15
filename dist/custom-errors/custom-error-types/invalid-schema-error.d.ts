import { CustomError, ErrorMessage } from './index.js';
export declare class InvalidSchemaError extends Error implements CustomError {
    constructor(message: string);
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
