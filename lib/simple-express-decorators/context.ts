/**
 * Immutable Context class for global properties
 * @export
 * @class Context
 */
export default class Context {
  public readonly user: null | string;
  constructor(user: null | string) {
    this.user = user;
  }
}
