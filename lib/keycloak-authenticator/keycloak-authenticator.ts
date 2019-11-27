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
      if (!request.headers || !request.headers.authorization) {
        return null;
      }

      const authHeader: string = request.headers.authorization;
      const token = authHeader.substring('Bearer '.length);
      const payload = jws.decode(token).payload;
      if (!payload || !payload.preferred_username) {
        return null;
      }
      return payload.preferred_username;
    } catch (err) {
      return null;
    }
  }

  public hasRole(request: Request, role: string | string[]): boolean {
    try {
      // @ts-ignore
      const authenticator = request.kauth.grant.access_token;
      if (typeof role === 'string') {
        return authenticator.hasRole(role);
      }

      let userHasRole = false;
      for (let i = 0; i < role.length; i = i + 1) {
        if (authenticator.hasRole(role[i])) {
          userHasRole = true;
          break;
        }
      }
      return userHasRole;
    } catch (err) {
      return false;
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
