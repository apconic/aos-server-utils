import { CustomError, ErrorMessage } from './';

export class InvalidSchemaError extends Error implements CustomError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidSchemaError.prototype);
  }

  public httpCode(): number {
    return 400;
  }

  public errorMessage(): ErrorMessage {
    return {
      message: this.message
    };
  }
}
