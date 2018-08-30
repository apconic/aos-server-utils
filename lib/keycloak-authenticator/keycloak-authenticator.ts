import jws from 'jws';
// @ts-ignore
import KeycloakConnect from 'keycloak-connect';
import { injectable } from 'inversify';
import { Authenticator, KeycloakAuth } from './';
import { Request } from 'express';

@injectable()
export class KeycloakAuthenticator implements Authenticator {
  private authenticator: KeycloakAuth;

  constructor() {
    this.authenticator = new KeycloakConnect({}, buildConfig());
  }

  public getAuthenticator(): KeycloakAuth {
    return this.authenticator;
  }

  public getUser(request: Request): null | string {
    try {
      if (!request.header('Authorization')) {
        return null;
      }
      // @ts-ignore
      const token = request.header('Authorization').substring('Bearer '.length);
      const payload = jws.decode(token).payload;
      if (!payload || !payload.preferred_username) {
        return null;
      }
      return payload.preferred_username;
    } catch (err) {
      return null;
    }
  }
}

function buildConfig() {
  return {
    realm: process.env.KEYCLOAK_REALM as string | 'goodstrack',
    clientId: process.env.KEYCLOAK_CLIENT_ID as string | 'admin-server',
    'realm-public-key': process.env.KEYCLOAK_REALM_PUBLIC_KEY as string | null,
    'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL as
      | string
      | 'http://13.127.63.157:8080/auth',
    'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED as string | 'external',
    'use-resource-role-mappings': process.env
      .KEYCLOAK_USE_RESOURCE_ROLE_MAPPINGS as string | 'false',
    'public-client': process.env.KEYCLOAK_PUBLIC_CLIENT as string | 'false',
    'enable-cors': process.env.KEYCLOAK_ENABLE_CORS as string | 'false',
    'cors-max-age': process.env.KEYCLOAK_CORS_MAX_AGE as string | null,
    'bearer-only': process.env.KEYCLOAK_BEARER_ONLY as boolean | 'true',
    'proxy-url': process.env.KEYCLOAK_PROXY_URL as string | null
  };
}
