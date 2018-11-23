import { Request } from 'express';

export interface Authenticator {
  getAuthenticator(): KeycloakAuth;
  getUser(request: Request): null | string;
  hasRole(request: Request, role: string | string[]): boolean;
}

export interface KeycloakAuth {
  middleware(options?: any): any;
  protect(role?: Function | string): any;
}

export { KeycloakAuthenticator } from './keycloak-authenticator';
export { MockKeycloakAuthenticator } from './mock-keycloak-authenticator';
