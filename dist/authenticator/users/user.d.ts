import { UserTypes } from './constants';
export default interface User {
    transporterCode?: string;
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
}
