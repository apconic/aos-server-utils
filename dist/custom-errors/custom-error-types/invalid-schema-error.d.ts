import { CustomError, ErrorMessage } from './';
export declare class InvalidSchemaError extends Error implements CustomError {
    constructor(message: string);
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
