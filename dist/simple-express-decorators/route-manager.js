"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
class RouteManager {
    constructor(router, container) {
        this.router = router;
        this.container = container;
    }
    static registerRouteControllers(controllerName, params) {
        RouteManager.routeControllers.set(controllerName, params);
    }
    static registerGetMethodRoutes(params) {
        RouteManager.getMethodParams.push(params);
    }
    static registerPostMethodRoutes(params) {
        RouteManager.postMethodParams.push(params);
    }
    static registerDeleteMethodRoutes(params) {
        RouteManager.deleteMethodParams.push(params);
    }
    configure(authenticator) {
        RouteManager.getMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = authenticator.getAuthenticator();
            this.router.get(routePath, role ? auth.protect(role) : auth.protect(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    const context = new context_1.Context(authenticator.getUser(request));
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
        RouteManager.postMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = authenticator.getAuthenticator();
            this.router.post(routePath, role ? auth.protect(role) : auth.protect(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    const context = new context_1.Context(authenticator.getUser(request));
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
        RouteManager.deleteMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = authenticator.getAuthenticator();
            this.router.delete(routePath, role ? auth.protect(role) : auth.protect(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    const context = new context_1.Context(authenticator.getUser(request));
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
    }
}
RouteManager.getMethodParams = [];
RouteManager.postMethodParams = [];
RouteManager.deleteMethodParams = [];
RouteManager.routeControllers = new Map();
exports.default = RouteManager;
