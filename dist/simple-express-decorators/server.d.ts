import { Application } from 'express';
import { Container } from 'inversify';
import { Authenticator } from '../authenticator/index.js';
export default class Server {
    private port;
    private httpServer;
    private container;
    private routeManagers;
    app: Application;
    constructor(port: any, container: Container);
    use(...middleWareFunc: any[]): void;
    createRouter(path: string, authenticator?: Authenticator): void;
    start(): void;
    stop(): void;
}
