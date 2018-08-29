import { Authenticator, KeycloakAuth } from './';
export declare class MockKeycloakAuthenticator implements Authenticator {
    getAuthenticator(): KeycloakAuth;
    getUser(token: string): null | string;
}
