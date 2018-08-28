"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockKeycloakAuthenticator {
    getAuthenticator() {
        const mockKeycloak = {
            middleware(options) {
                return [
                    (request, response, next) => next()
                ];
            },
            protect(role) {
                return (request, response, next) => {
                    return next();
                };
            }
        };
        return mockKeycloak;
    }
    getUser(token) {
        return 'integrationTestUser';
    }
}
exports.MockKeycloakAuthenticator = MockKeycloakAuthenticator;
