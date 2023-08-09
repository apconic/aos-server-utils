import { UserTypes } from './constants';
export default interface User {
    transporterCode: string | null;
    username: string;
    currentBU: string;
    userType: UserTypes;
    isInBU(buCode: string): boolean;
    isTransporter(): boolean;
    /**
     * Throws error if user does not have given role.
     *
     * @param {string} roleName
     * @memberof User
     */
    checkRole(roleName: string): void;
    /**
     *
     * Returns plain user object. Used to pass user object to other micro-services.
     * @returns {*}
     * @memberof User
     */
    toPlainObject(): any;
}
