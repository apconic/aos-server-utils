import { InvalidSchemaError, ResourceNotFoundError, AccessDeniedError, } from '../custom-error-types/index.js';
export function errorHandler(error, request, response, next) {
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
