import MethodParams from './method-params';
import { Container } from 'inversify';
import { Request, Response, NextFunction, Router } from 'express';
import { Authenticator, KeycloakAuth } from '../keycloak-authenticator';
import { Context } from './context';

export default class RouteManager {
  private static getMethodParams: Array<MethodParams> = [];
  private static postMethodParams: Array<MethodParams> = [];
  private static deleteMethodParams: Array<MethodParams> = [];
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

  constructor(router: Router, container: Container) {
    this.router = router;
    this.container = container;
  }

  configure(authenticator: Authenticator) {
    RouteManager.getMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      const auth: KeycloakAuth = authenticator.getAuthenticator();
      this.router.get(
        routePath,
        role ? auth.protect(role) : auth.protect(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }
            const context = new Context(
              authenticator.getUser(
                // @ts-ignore
                request.headers.authorization.substring('Bearer '.length)
              )
            );
            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        }
      );
    });
    RouteManager.postMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      const auth: KeycloakAuth = authenticator.getAuthenticator();
      this.router.post(
        routePath,
        role ? auth.protect(role) : auth.protect(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }
            const context = new Context(
              authenticator.getUser(
                // @ts-ignore
                request.headers.authorization.substring('Bearer '.length)
              )
            );
            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        }
      );
    });

    RouteManager.deleteMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      const auth: KeycloakAuth = authenticator.getAuthenticator();
      this.router.delete(
        routePath,
        role ? auth.protect(role) : auth.protect(),
        async (request: Request, response: Response, next: NextFunction) => {
          try {
            const controller: any = this.container.get(targetController);
            if (!controller || !controller[propertyKey]) {
              return response.status(404).send({ message: 'Invalid path' });
            }
            const context = new Context(
              authenticator.getUser(
                // @ts-ignore
                request.headers.authorization.substring('Bearer '.length)
              )
            );
            await controller[propertyKey](request, response, context);
          } catch (err) {
            next(err);
          }
        }
      );
    });
  }
}
