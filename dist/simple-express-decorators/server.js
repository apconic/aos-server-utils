"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_manager_1 = __importDefault(require("./route-manager"));
const http = __importStar(require("http"));
const https = __importStar(require("https"));
class Server {
    constructor(config) {
        var _a;
        this.routeManagers = new Map();
        this.port = config.port;
        this.app = (0, express_1.default)();
        this.server = null;
        this.container = config.container;
        this.httpsEnabled = (_a = config.httpsEnabled) !== null && _a !== void 0 ? _a : false;
        this.credentials = config.credentials;
    }
    use(...middleWareFunc) {
        this.app.use(middleWareFunc);
    }
    createRouter(path, authenticator) {
        const router = express_1.default.Router();
        const routeManager = new route_manager_1.default(router, this.container);
        routeManager.configure(authenticator);
        this.routeManagers.set(path, routeManager);
        this.app.use(path, router);
    }
    start() {
        if (this.httpsEnabled) {
            this.server = https.createServer(this.credentials, this.app).listen(this.port);
        }
        else {
            this.server = http.createServer(this.app).listen(this.port);
        }
    }
    stop() {
        if (!this.server) {
            return;
        }
        this.server.close();
        this.server = null;
    }
}
exports.default = Server;
