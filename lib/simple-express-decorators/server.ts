import express, { Application } from 'express';
import RouteManager from './route-manager';
import { Container } from 'inversify';
import * as http from 'http';
import { Authenticator } from '../authenticator';

export default class Server {
  private port: any;
  private app: Application;
  private httpServer: http.Server | null;
  private container: Container;
  private routeManagers: Map<string, RouteManager> = new Map<string, RouteManager>();

  constructor(port: any, container: Container) {
    this.port = port;
    this.app = express();
    this.httpServer = null;
    this.container = container;
  }

  public use(...middleWareFunc: any[]) {
    this.app.use(middleWareFunc);
  }

  public createRouter(path: string, authenticator?: Authenticator) {
    const router = express.Router();
    const routeManager = new RouteManager(router, this.container);
    routeManager.configure(authenticator);
    this.routeManagers.set(path, routeManager);
    this.app.use(path, router);
  }

  public start() {
    if (!this.httpServer) {
      this.httpServer = this.app.listen(this.port);
    }
  }

  public stop() {
    if (!this.httpServer) {
      return;
    }

    this.httpServer.close();
    this.httpServer = null;
  }
}
