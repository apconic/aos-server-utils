import { Authenticator, KeycloakAuth } from './';
import { Request, Response, NextFunction } from 'express';

export class MockKeycloakAuthenticator implements Authenticator {
  public getAuthenticator(): KeycloakAuth {
    const mockKeycloak: KeycloakAuth = {
      middleware(options) {
        return [
          (request: Request, response: Response, next: NextFunction) => next()
        ];
      },
      protect(role) {
        return (request: Request, response: Response, next: NextFunction) => {
          return next();
        };
      }
    };

    return mockKeycloak;
  }

  public getUser(token: string): null | string {
    return 'integrationTestUser';
  }
}
