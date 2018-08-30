## **CustomErrors**

A new instance of these Extended Error classes can be thrown when appropriate error is encountered.  
Usage:

```Typescript
import { InvalidSchemaError } from 'aos-server-utils';
...
public async modifySettings(context: Context, payload: any) {
    const res: any = Joi.validate(payload, updateSettingsSchema);
    if (res.error) {
        throw new InvalidSchemaError(res.error.message);
    }
    ...
}
```

Custom Error classes which can be imported are:

- InvalidSchemaError
- ResourceNotFoundError
- UnknownUserError

---

## **errorHandler**

A handler to be used as express middleware to send appropriate http code and message to client.  
**Use as the last middleware**  
Usage:

```Typescript
import { Authenticator, errorHandler } from 'aos-server-utils';
...
    // Get authenticator singleton instance from container
    server.use(auth.getAuthenticator().middleware());

    server.use(cors());
    server.use(bodyParser.json());
    server.createRouter('/v1/', auth);

    // IMPORTANT => Use errorHandler as the last middleware
    server.use((err, req, res, next) => {
      // Log error messages if required.
      // errorHandler does not provide logging.
      logger.error(err.message);
      logger.error(
        `Request => Hostname: ${req.hostname}, IP: ${
          req.ips
        }, Params: ${JSON.stringify(req.params)},  Query: ${JSON.stringify(
          req.query
        )}, Body: ${JSON.stringify(req.body)} , \nHeaders => ${JSON.stringify(
          req.headers
        )}`
      );
      errorHandler(err, req, res, next);
    });
    server.start();
```
