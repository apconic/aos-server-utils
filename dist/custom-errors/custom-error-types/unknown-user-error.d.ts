import { CustomError, ErrorMessage } from './';
export declare class UnknownUserError extends Error implements CustomError {
    constructor(message: string);
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
