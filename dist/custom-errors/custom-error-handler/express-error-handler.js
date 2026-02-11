"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const index_js_1 = require("../custom-error-types/index.js");
function errorHandler(error, request, response, next) {
    switch (true) {
        case error instanceof index_js_1.InvalidSchemaError:
        case error instanceof index_js_1.ResourceNotFoundError:
        case error instanceof index_js_1.AccessDeniedError:
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
