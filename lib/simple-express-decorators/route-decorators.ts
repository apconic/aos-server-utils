import RouteManager from './route-manager';
import MethodParams from './method-params';

export function get(path: string, role?: string | string[], isSecure = true) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerGetMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
  };
}

export function post(path: string, role?: string | string[], isSecure = true) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerPostMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
  };
}

export function del(path: string, role?: string | string[], isSecure = true) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerDeleteMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
  };
}

export function controller(name: any, basePath: string) {
  // tslint:disable-next-line: ban-types
  return function (target: Function) {
    RouteManager.registerRouteControllers(target.name, { basePath, name });
  };
}
