import User from './user.js';

export default class AnonymousUser implements User {
  private currentBusinessUnit: any = null;

  get transporterCode(): any {
    return null;
  }

  set currentBU(buCode: string) {
    this.currentBusinessUnit = buCode;
  }

  get currentBU() {
    return this.currentBusinessUnit;
  }

  get userType(): any {
    return null;
  }

  public get username(): string {
    return 'ANONYMOUS';
  }

  public isInBU(buCode: string): boolean {
    return true;
  }

  public isTransporter(): boolean {
    return false;
  }

  public checkRole(roleName: string): boolean {
    return false;
  }
}
