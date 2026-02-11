import {
  InvalidSchemaError,
  ResourceNotFoundError,
  AccessDeniedError,
  CustomError,
} from '../custom-error-types/index.js';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: CustomError, request: Request, response: Response, next: NextFunction): void {
  switch (true) {
    case error instanceof InvalidSchemaError:
    case error instanceof ResourceNotFoundError:
    case error instanceof AccessDeniedError:
      response.status(error.httpCode()).json(error.errorMessage());
      break;
    case error.message.includes('User has no session'):
      error.message = 'Authentication failed. User was not logged in.';
      response.status(403).json({ result: 'ERROR', message: 'User is not logged in' });
      break;
    default:
      response.status(500).json({
        result: 'ERROR',
        message: 'Internal server error',
      });
  }
}
