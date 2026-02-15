import { CustomError, ErrorMessage } from './index.js';
export declare class ResourceNotFoundError extends Error implements CustomError {
    constructor(message: string);
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
