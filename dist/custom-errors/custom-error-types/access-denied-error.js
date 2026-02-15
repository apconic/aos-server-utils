export class AccessDeniedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
    httpCode() {
        return 403;
    }
    errorMessage() {
        return {
            result: 'ERROR',
            message: this.message,
        };
    }
}
