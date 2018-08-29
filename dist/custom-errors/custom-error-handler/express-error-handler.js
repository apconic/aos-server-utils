"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_types_1 = require("../custom-error-types");
function errorHandler(error, request, response, next) {
    switch (true) {
        case error instanceof custom_error_types_1.InvalidSchemaError:
        case error instanceof custom_error_types_1.ResourceNotFoundError:
        case error instanceof custom_error_types_1.UnknownUserError:
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
exports.errorHandler = errorHandler;
