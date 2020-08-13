import { Request } from 'express';
import Authenticator from './authenticator';
import { User } from './users';
declare class HomeServerAuthenticator implements Authenticator {
    private USER_SESSION_QUERY;
    getMiddleware(): ((request: any, response: any, next: any) => any)[];
    getUser(request: Request): Promise<User>;
    private getCurrentBU;
    private getTransporterCode;
    private getType;
    private getUsername;
    private getBusinessUnits;
}
export default HomeServerAuthenticator;
