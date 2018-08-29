import { Authenticator, KeycloakAuth } from './';
import { Request } from 'express';
export declare class MockKeycloakAuthenticator implements Authenticator {
    getAuthenticator(): KeycloakAuth;
    getUser(request: Request): null | string;
}
