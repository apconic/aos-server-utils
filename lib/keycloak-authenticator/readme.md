**Keycloak Authenticator**

A injectable (InversifyJS) class which implements Authenticator interface.  
When creating inversify bindings:

```Typescript
import {
  Authenticator,
  KeycloakAuthenticator,
  MockKeycloakAuthenticator
} from 'aos-server-utils';
...

container
    .bind<Authenticator>(TYPES.Authenticator)
    // Bind with MockKeycloakAuthenticator to mock Keycloak during development
    .to(KeycloakAuthenticator)
    .inSingletonScope();
```

When initializing express:

```Typescript
import { Authenticator} from 'aos-server-utils';
...

const auth: Authenticator = container.get(TYPES.Authenticator);
server.use(auth.getAuthenticator().middleware());
server.createRouter('/v1/', auth);
```

To get user in your controller, make sure your last parameter is 'context'.  
Example:

```Typescript
@post('/update')
  public async updateSettings(req: Request, res: Response, context: any) {
    const response = await this.settingService.modifySettings(
      context.user,
      req.body
    );
    res.status(200).json(response);
  }
```

# Important

Include these environment variables (In your .env file) for keycloak configuration:

```.env
# Keycloak settings
KEYCLOAK_REALM = goodstrack
KEYCLOAK_BEARER_ONLY = true
KEYCLOAK_AUTH_SERVER_URL = http://13.127.63.157:8080/auth
KEYCLOAK_SSL_REQUIRED = external
KEYCLOAK_CLIENT_ID = admin-server
KEYCLOAK_CONFIDENTIAL_PORT = 0
```
