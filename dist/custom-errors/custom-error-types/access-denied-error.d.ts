import { CustomError, ErrorMessage } from './index.js';
export declare class AccessDeniedError extends Error implements CustomError {
    constructor(message: string);
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
