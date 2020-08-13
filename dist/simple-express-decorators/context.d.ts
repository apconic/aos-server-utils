import { User } from '../authenticator';
/**
 * Immutable Context class for global properties
 * @export
 * @class Context
 */
export default class Context {
    readonly user: User;
    constructor(user: User);
}
