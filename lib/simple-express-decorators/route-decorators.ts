import RouteManager from './route-manager';
import MethodParams from './method-params';

export function get(path: string, role?: any, isSecure: boolean = true) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerGetMethodRoutes(
      new MethodParams(name, path, propertyKey, role || null, isSecure)
    );
  };
}

export function post(path: string, role?: any, isSecure: boolean = true) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerPostMethodRoutes(
      new MethodParams(name, path, propertyKey, role || null, isSecure)
    );
  };
}

export function del(path: string, role?: any, isSecure: boolean = true) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerDeleteMethodRoutes(
      new MethodParams(name, path, propertyKey, role || null, isSecure)
    );
  };
}

export function controller(name: any, basePath: string) {
  return function(target: Function) {
    RouteManager.registerRouteControllers(target.name, { basePath, name });
  };
}
