import { CustomError, ErrorMessage } from './';

export class UnknownUserError extends Error implements CustomError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnknownUserError.prototype);
  }

  public httpCode(): number {
    return 403;
  }

  public errorMessage(): ErrorMessage {
    return {
      message: 'User not found from request'
    };
  }
}
