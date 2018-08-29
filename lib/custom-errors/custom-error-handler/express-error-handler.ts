import {
  InvalidSchemaError,
  ResourceNotFoundError,
  UnknownUserError,
  CustomError
} from '../custom-error-types';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  switch (true) {
    case error instanceof InvalidSchemaError:
    case error instanceof ResourceNotFoundError:
    case error instanceof UnknownUserError:
      response.status(error.httpCode()).json(error.errorMessage());
      break;
    case error.message === 'keycloak.redirectToLogin is not a function':
      response.status(403).json({ message: 'User is not logged in' });
    default:
      response.status(500).json({
        message: 'Internal server error'
      });
  }
}
