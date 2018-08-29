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
    // Bind which MockKeycloakAuthenticator to mock during development
    .to(KeycloakAuthenticator)
    .inSingletonScope();
```

When initializing express:

```Typescript
import { Authenticator} from 'aos-server-utils';
...

const auth: Authenticator = container.get(TYPES.Authenticator);
server.use(auth.getAuthenticator().middleware());
server.createRouter('/v1/', auth.getAuthenticator().protect);
```
