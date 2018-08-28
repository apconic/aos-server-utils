export interface Authenticator {
  getAuthenticator(): KeycloakAuth;
  getUser(token: string): null | string;
}

export interface KeycloakConfig {
  realm: string;
  resource: string;
  'realm-public-key'?: string;
  'auth-server-url': string;
  'ssl-required'?: 'all' | 'external' | 'none';
  'use-resource-role-mappings'?: boolean;
  'public-client'?: boolean;
  'enable-cors'?: boolean;
  'cors-max-age'?: number;
  'bearer-only'?: boolean;
  'proxy-url'?: string;
}

export interface KeycloakAuth {
  middleware(options: any): any;
  protect(role: Function | string): any;
}

export { KeycloakAuthenticator } from './keycloak-authenticator';
export { MockKeycloakAuthenticator } from './mock-keycloak-authenticator';
