import { User } from './users';
export default interface Authenticator {
    getMiddleware(): any;
    getUser(request: any): Promise<User>;
}
