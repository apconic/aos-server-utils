import { Authenticator, KeycloakAuth } from './';
import { Request } from 'express';
export declare class KeycloakAuthenticator implements Authenticator {
    private authenticator;
    constructor();
    getAuthenticator(): KeycloakAuth;
    getUser(request: Request): null | string;
}
