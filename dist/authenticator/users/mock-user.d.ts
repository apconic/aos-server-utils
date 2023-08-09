import { UserDetails, UserTypes } from './constants';
import User from './user';
export default class MockUser implements User {
    #private;
    constructor(userDetails: UserDetails);
    get transporterCode(): string | null;
    get currentBU(): any;
    get userType(): UserTypes;
    get username(): string;
    isInBU(buCode: string): boolean;
    isTransporter(): boolean;
    checkRole(roleName: string): void;
    toPlainObject(): {
        username: string;
        userType: UserTypes;
        currentBU: any;
        transporterCode: string | null;
    };
}
