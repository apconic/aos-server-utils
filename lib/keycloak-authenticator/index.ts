export interface Authenticator {
  getAuthenticator(): KeycloakAuth;
  getUser(token: string): null | string;
}

export interface KeycloakAuth {
  middleware(options?: any): any;
  protect(role?: Function | string): any;
}

export { KeycloakAuthenticator } from './keycloak-authenticator';
export { MockKeycloakAuthenticator } from './mock-keycloak-authenticator';
