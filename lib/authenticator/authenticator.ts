import { User } from './users/index.js';

export default interface Authenticator {
  getMiddleware(): any;
  getUser(request: any): Promise<User>;
}
