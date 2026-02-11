export interface CustomError extends Error {
    httpCode(): number;
    errorMessage(): ErrorMessage;
}
export interface ErrorMessage {
    message: string;
    [key: string]: string;
}
export { InvalidSchemaError } from './invalid-schema-error.js';
export { ResourceNotFoundError } from './resource-not-found-error.js';
export { AccessDeniedError } from './access-denied-error.js';
