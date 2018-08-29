/**
 * Immutable Context class for global properties
 * @export
 * @class Context
 */
export class Context {
  public readonly user: null | string;
  constructor(user: null | string) {
    this.user = user;
  }
}
