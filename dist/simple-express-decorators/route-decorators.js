"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_manager_1 = __importDefault(require("./route-manager"));
const method_params_1 = __importDefault(require("./method-params"));
function get(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_1.default.registerGetMethodRoutes(new method_params_1.default(name, path, propertyKey, role, isSecure));
    };
}
exports.get = get;
function post(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_1.default.registerPostMethodRoutes(new method_params_1.default(name, path, propertyKey, role, isSecure));
    };
}
exports.post = post;
function del(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_1.default.registerDeleteMethodRoutes(new method_params_1.default(name, path, propertyKey, role, isSecure));
    };
}
exports.del = del;
function controller(name, basePath) {
    // tslint:disable-next-line: ban-types
    return function (target) {
        route_manager_1.default.registerRouteControllers(target.name, { basePath, name });
    };
}
exports.controller = controller;
