import { User } from '../authenticator/index.js';
/**
 * Immutable Context class for global properties
 * @export
 * @class Context
 */
export default class Context {
    readonly user: User;
    constructor(user: User);
}
