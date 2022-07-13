import express, { Application } from 'express';
import RouteManager from './route-manager';
import { Container } from 'inversify';
import * as http from 'http';
import * as https from 'https';
import { Authenticator } from '../authenticator';

export default class Server {
  private port: any;
  private server: http.Server | https.Server | null;
  private httpsEnabled: boolean;
  private container: Container;
  private credentials: any;
  private routeManagers: Map<string, RouteManager> = new Map<string, RouteManager>();
  public app: Application;

  constructor(config: { port: number; container: Container; httpsEnabled?: boolean; credentials?: object }) {
    this.port = config.port;
    this.app = express();
    this.server = null;
    this.container = config.container;
    this.httpsEnabled = config.httpsEnabled ?? false;
    this.credentials = config.credentials;
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
    if (this.httpsEnabled) {
      this.server = https.createServer(this.credentials, this.app).listen(this.port);
    } else {
      this.server = http.createServer(this.app).listen(this.port);
    }
  }

  public stop() {
    if (!this.server) {
      return;
    }

    this.server.close();
    this.server = null;
  }
}
