"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./context"));
const authenticator_1 = require("../authenticator");
class RouteManager {
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
    static registerPutMethodRoutes(params) {
        RouteManager.putMethodParams.push(params);
    }
    static registerPatchMethodRoutes(params) {
        RouteManager.patchMethodParams.push(params);
    }
    constructor(router, container) {
        this.router = router;
        this.container = container;
    }
    configure(authenticator) {
        // Bind GET endpoints
        RouteManager.getMethodParams.forEach((params) => {
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.get(routePath, this.forwardRequest(), async (request, response, next) => {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(new authenticator_1.AnonymousUser());
                    if (isSecure && authenticator) {
                        const user = await authenticator.getUser(request);
                        if (Array.isArray(role)) {
                            for (const r of role) {
                                user.checkRole(r);
                            }
                        }
                        else if (role) {
                            user.checkRole(role);
                        }
                        context = new context_1.default(user);
                    }
                    await controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            });
        });
        // Bind POST endpoints
        RouteManager.postMethodParams.forEach((params) => {
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.post(routePath, this.forwardRequest(), async (request, response, next) => {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(new authenticator_1.AnonymousUser());
                    if (isSecure && authenticator) {
                        const user = await authenticator.getUser(request);
                        if (Array.isArray(role)) {
                            for (const r of role) {
                                user.checkRole(r);
                            }
                        }
                        else if (role) {
                            user.checkRole(role);
                        }
                        context = new context_1.default(user);
                    }
                    await controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            });
        });
        // BIND DELETE endpoints
        RouteManager.deleteMethodParams.forEach((params) => {
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.delete(routePath, this.forwardRequest(), async (request, response, next) => {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(new authenticator_1.AnonymousUser());
                    if (isSecure && authenticator) {
                        const user = await authenticator.getUser(request);
                        if (Array.isArray(role)) {
                            for (const r of role) {
                                user.checkRole(r);
                            }
                        }
                        else if (role) {
                            user.checkRole(role);
                        }
                        context = new context_1.default(user);
                    }
                    await controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            });
        });
        // BIND PUT endpoints
        RouteManager.putMethodParams.forEach((params) => {
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.put(routePath, this.forwardRequest(), async (request, response, next) => {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(new authenticator_1.AnonymousUser());
                    if (isSecure && authenticator) {
                        const user = await authenticator.getUser(request);
                        if (Array.isArray(role)) {
                            for (const r of role) {
                                user.checkRole(r);
                            }
                        }
                        else if (role) {
                            user.checkRole(role);
                        }
                        context = new context_1.default(user);
                    }
                    await controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            });
        });
        // BIND PATCH endpoints
        RouteManager.patchMethodParams.forEach((params) => {
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.patch(routePath, this.forwardRequest(), async (request, response, next) => {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(new authenticator_1.AnonymousUser());
                    if (isSecure && authenticator) {
                        const user = await authenticator.getUser(request);
                        if (Array.isArray(role)) {
                            for (const r of role) {
                                user.checkRole(r);
                            }
                        }
                        else if (role) {
                            user.checkRole(role);
                        }
                        context = new context_1.default(user);
                    }
                    await controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            });
        });
    }
    forwardRequest() {
        return (request, response, next) => {
            return next();
        };
    }
}
RouteManager.getMethodParams = [];
RouteManager.postMethodParams = [];
RouteManager.deleteMethodParams = [];
RouteManager.putMethodParams = [];
RouteManager.patchMethodParams = [];
RouteManager.routeControllers = new Map();
exports.default = RouteManager;
