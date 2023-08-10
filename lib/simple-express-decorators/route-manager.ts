import MethodParams from './method-params';
import { Container } from 'inversify';
import { Request, Response, NextFunction, Router } from 'express';
import Context from './context';
import { Authenticator, AnonymousUser } from '../authenticator';

export default class RouteManager {
  private static getMethodParams: MethodParams[] = [];
  private static postMethodParams: MethodParams[] = [];
  private static deleteMethodParams: MethodParams[] = [];
  private static putMethodParams: MethodParams[] = [];
  private static patchMethodParams: MethodParams[] = [];
  private static routeControllers: Map<string, any> = new Map<string, any>();
  private router: Router;
  private container: Container;

  public static registerRouteControllers(controllerName: string, params: any) {
    RouteManager.routeControllers.set(controllerName, params);
  }

  public static registerGetMethodRoutes(params: MethodParams) {
    RouteManager.getMethodParams.push(params);
  }

  public static registerPostMethodRoutes(params: MethodParams) {
    RouteManager.postMethodParams.push(params);
  }

  public static registerDeleteMethodRoutes(params: MethodParams) {
    RouteManager.deleteMethodParams.push(params);
  }

  public static registerPutMethodRoutes(params: MethodParams) {
    RouteManager.putMethodParams.push(params);
  }

  public static registerPatchMethodRoutes(params: MethodParams) {
    RouteManager.patchMethodParams.push(params);
  }

  constructor(router: Router, container: Container) {
    this.router = router;
    this.container = container;
  }

  public configure(authenticator?: Authenticator) {
    // Bind GET endpoints
    RouteManager.getMethodParams.forEach((params) => {
      const { target, path, role, isSecure, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.get(
        routePath,
        this.forwardRequest(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }

            let context = new Context(new AnonymousUser());
            if (isSecure && authenticator) {
              const user = await authenticator.getUser(request);
              if (Array.isArray(role)) {
                for (const r of role) {
                  user.checkRole(r);
                }
              } else if (role) {
                user.checkRole(role);
              }

              context = new Context(user);
            }

            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        },
      );
    });

    // Bind POST endpoints
    RouteManager.postMethodParams.forEach((params) => {
      const { target, path, role, isSecure, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.post(
        routePath,
        this.forwardRequest(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }

            let context = new Context(new AnonymousUser());
            if (isSecure && authenticator) {
              const user = await authenticator.getUser(request);
              if (Array.isArray(role)) {
                for (const r of role) {
                  user.checkRole(r);
                }
              } else if (role) {
                user.checkRole(role);
              }

              context = new Context(user);
            }

            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        },
      );
    });

    // BIND DELETE endpoints
    RouteManager.deleteMethodParams.forEach((params) => {
      const { target, path, role, isSecure, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.delete(
        routePath,
        this.forwardRequest(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }

            let context = new Context(new AnonymousUser());
            if (isSecure && authenticator) {
              const user = await authenticator.getUser(request);
              if (Array.isArray(role)) {
                for (const r of role) {
                  user.checkRole(r);
                }
              } else if (role) {
                user.checkRole(role);
              }

              context = new Context(user);
            }

            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        },
      );
    });

    // BIND PUT endpoints
    RouteManager.putMethodParams.forEach((params) => {
      const { target, path, role, isSecure, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.put(
        routePath,
        this.forwardRequest(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }

            let context = new Context(new AnonymousUser());
            if (isSecure && authenticator) {
              const user = await authenticator.getUser(request);
              if (Array.isArray(role)) {
                for (const r of role) {
                  user.checkRole(r);
                }
              } else if (role) {
                user.checkRole(role);
              }

              context = new Context(user);
            }

            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        },
      );
    });

    // BIND PATCH endpoints
    RouteManager.patchMethodParams.forEach((params) => {
      const { target, path, role, isSecure, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.patch(
        routePath,
        this.forwardRequest(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }

            let context = new Context(new AnonymousUser());
            if (isSecure && authenticator) {
              const user = await authenticator.getUser(request);
              if (Array.isArray(role)) {
                for (const r of role) {
                  user.checkRole(r);
                }
              } else if (role) {
                user.checkRole(role);
              }

              context = new Context(user);
            }

            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        },
      );
    });
  }

  private forwardRequest() {
    return (request: Request, response: Response, next: NextFunction) => {
      return next();
    };
  }
}
