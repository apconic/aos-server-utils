import jws from 'jws';
// @ts-ignore
import KeycloakConnect from 'keycloak-connect';
import { Authenticator, KeycloakConfig, KeycloakAuth } from './';

export class KeycloakAuthenticator implements Authenticator {
  private authenticator: KeycloakAuth;

  constructor(config: KeycloakConfig) {
    this.authenticator = new KeycloakConnect({}, config);
  }

  public getAuthenticator(): KeycloakAuth {
    return this.authenticator;
  }

  public getUser(token: string): null | string {
    const payload = jws.decode(token).payload;
    if (!payload || !payload.preferred_username) {
      return null;
    }
    return payload.preferred_username;
  }
}
