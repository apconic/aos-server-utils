import User from './user.js';
export default class AnonymousUser implements User {
    private currentBusinessUnit;
    get transporterCode(): any;
    set currentBU(buCode: string);
    get currentBU(): string;
    get userType(): any;
    get username(): string;
    isInBU(buCode: string): boolean;
    isTransporter(): boolean;
    checkRole(roleName: string): boolean;
}
