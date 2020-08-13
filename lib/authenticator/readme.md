**Home server authenticator**

A injectable (InversifyJS) class which implements Authenticator interface.  
When creating inversify bindings:

# Important

Include these environment variables (In your .env file) for home authenticator configuration:

```.env
## Authentication ##
HOME_GRAPHQL_AUTHENTICATION_URL = 'http://localhost:27230/graphql'
```

```Typescript
import {
  Authenticator,
  HomeServerAuthenticator,
  MockKeycloakAuthenticator
} from 'aos-server-utils';
...

container
    .bind<Authenticator>(TYPES.Authenticator)
    // Bind with MockKeycloakAuthenticator to mock Keycloak during development
    .to(HomeServerAuthenticator)
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
