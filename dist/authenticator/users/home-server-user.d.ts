import { UserDetails, UserTypes } from './constants.js';
import User from './user.js';
export default class HomeServerUser implements User {
    #private;
    constructor(userDetails: UserDetails);
    get transporterCode(): string | undefined;
    get currentBU(): any;
    get userType(): UserTypes;
    get username(): string;
    isInBU(buCode: string): boolean;
    isTransporter(): boolean;
    checkRole(roleName: string): boolean;
}
