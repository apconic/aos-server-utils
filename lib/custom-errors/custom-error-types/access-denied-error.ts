import { CustomError, ErrorMessage } from './index.js';

export class AccessDeniedError extends Error implements CustomError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }

  public httpCode(): number {
    return 403;
  }

  public errorMessage(): ErrorMessage {
    return {
      result: 'ERROR',
      message: this.message,
    };
  }
}
