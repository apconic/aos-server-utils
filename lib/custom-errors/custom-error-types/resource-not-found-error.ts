import { CustomError, ErrorMessage } from './';

export class ResourceNotFoundError extends Error implements CustomError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }

  public httpCode(): number {
    return 404;
  }

  public errorMessage(): ErrorMessage {
    return {
      message: this.message,
    };
  }
}
