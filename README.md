# **aos-server-utils**

# _Published Version: 1.0.2_

Contains utilities such as Custom Errors, Keycloak Wrapper etc which are shared by various projects at [Apconic](http://www.apconic.com).

1.  **CustomErrors**  
    Extended Error classes which contains http error code and error message, which are sent to client when API request encounters an error.  
    Also contains an _errorHandler_ to handle CustomErrors as well as general errors

    _Future release: Internationalized error message._  
    [More info](./lib/custom-errors/readme.md)

2.  **Home server authenticator**  
    An _injectable_ (refer: [InversifyJS](https://github.com/inversify/InversifyJS)) Authenticator class to be used for authentication on API requests.
    Also contains a Mock Authenticator which can be used during development.  
    [More info](./lib/authenticator/readme.md)

3.  **Simple Express Decorators**  
    Very simple implementation of express decorators. Depends on inversify and Keycloak Authenticator (Module 2).  
    [More info](./lib/simple-express-decorators/README.md)
