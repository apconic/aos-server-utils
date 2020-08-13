import { Container } from 'inversify';
import { Authenticator } from '../authenticator';
export default class Server {
    private port;
    private app;
    private httpServer;
    private container;
    private routeManagers;
    constructor(port: any, container: Container);
    use(...middleWareFunc: any[]): void;
    createRouter(path: string, authenticator?: Authenticator): void;
    start(): void;
    stop(): void;
}
