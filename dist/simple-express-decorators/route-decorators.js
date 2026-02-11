"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.post = post;
exports.del = del;
exports.put = put;
exports.patch = patch;
exports.controller = controller;
const route_manager_js_1 = __importDefault(require("./route-manager.js"));
const method_params_js_1 = __importDefault(require("./method-params.js"));
function get(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_js_1.default.registerGetMethodRoutes(new method_params_js_1.default(name, path, propertyKey, role, isSecure));
    };
}
function post(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_js_1.default.registerPostMethodRoutes(new method_params_js_1.default(name, path, propertyKey, role, isSecure));
    };
}
function del(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_js_1.default.registerDeleteMethodRoutes(new method_params_js_1.default(name, path, propertyKey, role, isSecure));
    };
}
function put(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_js_1.default.registerPutMethodRoutes(new method_params_js_1.default(name, path, propertyKey, role, isSecure));
    };
}
function patch(path, role, isSecure = true) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        route_manager_js_1.default.registerPatchMethodRoutes(new method_params_js_1.default(name, path, propertyKey, role, isSecure));
    };
}
function controller(name, basePath) {
    // tslint:disable-next-line: ban-types
    return function (target) {
        route_manager_js_1.default.registerRouteControllers(target.name, { basePath, name });
    };
}
