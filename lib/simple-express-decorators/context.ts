import { User } from '../authenticator';

/**
 * Immutable Context class for global properties
 * @export
 * @class Context
 */
export default class Context {
  public readonly user: User;
  constructor(user: User) {
    this.user = user;
  }
}
