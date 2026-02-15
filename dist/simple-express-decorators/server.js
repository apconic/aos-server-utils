import express from 'express';
import RouteManager from './route-manager.js';
export default class Server {
    constructor(port, container) {
        this.routeManagers = new Map();
        this.port = port;
        this.app = express();
        this.httpServer = null;
        this.container = container;
    }
    use(...middleWareFunc) {
        this.app.use(middleWareFunc);
    }
    createRouter(path, authenticator) {
        const router = express.Router();
        const routeManager = new RouteManager(router, this.container);
        routeManager.configure(authenticator);
        this.routeManagers.set(path, routeManager);
        this.app.use(path, router);
    }
    start() {
        if (!this.httpServer) {
            this.httpServer = this.app.listen(this.port);
        }
    }
    stop() {
        if (!this.httpServer) {
            return;
        }
        this.httpServer.close();
        this.httpServer = null;
    }
}
