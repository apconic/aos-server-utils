export interface CustomError extends Error {
  httpCode(): number;
  errorMessage(): ErrorMessage;
}

export interface ErrorMessage {
  message: string;
  [key: string]: string;
}

export { InvalidSchemaError } from './invalid-schema-error';
export { ResourceNotFoundError } from './resource-not-found-error';
export { UnknownUserError } from './unknown-user-error';
