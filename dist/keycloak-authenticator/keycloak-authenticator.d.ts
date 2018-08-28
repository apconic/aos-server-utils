import { Authenticator, KeycloakConfig, KeycloakAuth } from './';
export declare class KeycloakAuthenticator implements Authenticator {
    private authenticator;
    constructor(config: KeycloakConfig);
    getAuthenticator(): KeycloakAuth;
    getUser(token: string): null | string;
}
