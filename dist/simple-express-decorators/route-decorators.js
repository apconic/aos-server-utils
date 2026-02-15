import RouteManager from './route-manager.js';
import MethodParams from './method-params.js';
export function get(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        RouteManager.registerGetMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
    };
}
export function post(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        RouteManager.registerPostMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
    };
}
export function del(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        RouteManager.registerDeleteMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
    };
}
export function put(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        RouteManager.registerPutMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
    };
}
export function patch(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        RouteManager.registerPatchMethodRoutes(new MethodParams(name, path, propertyKey, role, isSecure));
    };
}
export function controller(name, basePath) {
    // tslint:disable-next-line: ban-types
    return function (target) {
        RouteManager.registerRouteControllers(target.name, { basePath, name });
    };
}
