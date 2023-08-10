import { Application } from 'express';
import { Container } from 'inversify';
import { Authenticator } from '../authenticator';
export default class Server {
    private port;
    private server;
    private httpsEnabled;
    private container;
    private credentials;
    private routeManagers;
    app: Application;
    constructor(config: {
        port: number;
        container: Container;
        httpsEnabled?: boolean;
        credentials?: object;
    });
    use(...middleWareFunc: any[]): void;
    createRouter(path: string, authenticator?: Authenticator): void;
    start(): void;
    stop(): void;
}
