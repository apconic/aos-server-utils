import { Authenticator, KeycloakAuth } from './';
export declare class KeycloakAuthenticator implements Authenticator {
    private authenticator;
    constructor();
    getAuthenticator(): KeycloakAuth;
    getUser(token: string): null | string;
}
