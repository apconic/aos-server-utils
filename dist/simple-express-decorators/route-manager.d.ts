import MethodParams from './method-params';
import { Container } from 'inversify';
import { Router } from 'express';
import { Authenticator } from '../authenticator';
export default class RouteManager {
    private static getMethodParams;
    private static postMethodParams;
    private static deleteMethodParams;
    private static putMethodParams;
    private static patchMethodParams;
    private static routeControllers;
    private router;
    private container;
    static registerRouteControllers(controllerName: string, params: any): void;
    static registerGetMethodRoutes(params: MethodParams): void;
    static registerPostMethodRoutes(params: MethodParams): void;
    static registerDeleteMethodRoutes(params: MethodParams): void;
    static registerPutMethodRoutes(params: MethodParams): void;
    static registerPatchMethodRoutes(params: MethodParams): void;
    constructor(router: Router, container: Container);
    configure(authenticator?: Authenticator): void;
    private forwardRequest;
}
