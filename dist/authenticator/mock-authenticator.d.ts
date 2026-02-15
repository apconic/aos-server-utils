import Authenticator from './authenticator.js';
import { Request } from 'express';
import { User } from './users/index.js';
declare class MockAuthenticator implements Authenticator {
    getMiddleware(): ((request: any, response: any, next: any) => any)[];
    getUser(request: Request): Promise<User>;
    private getCurrentBU;
    private getTransporterCode;
    private getType;
    private getUsername;
    private getBusinessUnits;
    private getAccessToken;
}
export default MockAuthenticator;
