"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./context"));
const custom_errors_1 = require("../custom-errors");
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
        // Bind GET endpoints
        RouteManager.getMethodParams.forEach(params => {
            var _a;
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = (_a = authenticator) === null || _a === void 0 ? void 0 : _a.getAuthenticator();
            this.router.get(routePath, isSecure && auth ? auth.protect() : this.forwardRequest(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(null);
                    if (isSecure && authenticator) {
                        context = new context_1.default(authenticator.getUser(request));
                        if (role && !authenticator.hasRole(request, role)) {
                            throw new custom_errors_1.AccessDeniedError(`User: ${context.user} does not have appropriate role to access resource.`);
                        }
                    }
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
        // Bind POST endpoints
        RouteManager.postMethodParams.forEach(params => {
            var _a;
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = (_a = authenticator) === null || _a === void 0 ? void 0 : _a.getAuthenticator();
            this.router.post(routePath, isSecure && auth ? auth.protect() : this.forwardRequest(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(null);
                    if (isSecure && authenticator) {
                        context = new context_1.default(authenticator.getUser(request));
                        if (role && !authenticator.hasRole(request, role)) {
                            throw new custom_errors_1.AccessDeniedError(`User: ${context.user} does not have appropriate role to access resource.`);
                        }
                    }
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
        // BIND DELETE endpoints
        RouteManager.deleteMethodParams.forEach(params => {
            var _a;
            const { target, path, role, isSecure, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            const auth = (_a = authenticator) === null || _a === void 0 ? void 0 : _a.getAuthenticator();
            this.router.delete(routePath, isSecure && auth ? auth.protect() : this.forwardRequest(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const controller = this.container.get(targetController);
                    if (!controller || !controller[propertyKey]) {
                        return response.status(404).send({ message: 'Invalid path' });
                    }
                    let context = new context_1.default(null);
                    if (isSecure && authenticator) {
                        context = new context_1.default(authenticator.getUser(request));
                        if (role && !authenticator.hasRole(request, role)) {
                            throw new custom_errors_1.AccessDeniedError(`User: ${context.user} does not have appropriate role to access resource.`);
                        }
                    }
                    yield controller[propertyKey](request, response, context);
                }
                catch (err) {
                    next(err);
                }
            }));
        });
    }
    forwardRequest() {
        return (request, response, next) => {
            return next();
        };
    }
}
exports.default = RouteManager;
RouteManager.getMethodParams = [];
RouteManager.postMethodParams = [];
RouteManager.deleteMethodParams = [];
RouteManager.routeControllers = new Map();
