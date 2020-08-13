import { UserDetails, UserTypes } from './constants';
import User from './user';

export default class MockUser implements User {
  #preferredUsername: string;
  #businessUnits: string[];
  #transporterCode?: string;
  #currentBusinessUnit?: string;
  #userType: UserTypes;
  #roles: Array<{ name: string }>;

  constructor(userDetails: UserDetails) {
    this.#preferredUsername = userDetails.preferredUsername;
    this.#businessUnits = userDetails.businessUnits ?? [];
    this.#userType = userDetails.type || UserTypes.Normal;
    this.#currentBusinessUnit = userDetails.currentBusinessUnit;
    this.#transporterCode = userDetails.transporterCode;
    this.#roles = userDetails.roles ?? [];
  }

  get transporterCode() {
    return this.#transporterCode;
  }

  get currentBU(): any {
    return this.#currentBusinessUnit;
  }

  get userType() {
    return this.#userType;
  }

  public get username(): string {
    return this.#preferredUsername;
  }

  public isInBU(buCode: string): boolean {
    return this.#businessUnits.includes(buCode);
  }

  public isTransporter(): boolean {
    return this.#userType === UserTypes.Transporter;
  }

  public checkRole(roleName: string): void {
    return;
  }
}
