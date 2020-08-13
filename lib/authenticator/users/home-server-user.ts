import { UserDetails, UserTypes } from './constants';
import User from './user';
import { AccessDeniedError } from '../../custom-errors';

export default class HomeServerUser implements User {
  #preferredUsername: string;
  #businessUnits: string[];
  #transporterCode?: string;
  #userType: UserTypes;
  #currentBusinessUnit?: string;
  #roles: Array<{ name: string }>;

  constructor(userDetails: UserDetails) {
    this.#preferredUsername = userDetails.preferredUsername;
    this.#businessUnits = userDetails.businessUnits ?? [];
    this.#userType = userDetails.type || UserTypes.Normal;
    this.#transporterCode = userDetails.transporterCode;
    this.#currentBusinessUnit = userDetails.currentBusinessUnit;
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
    if (!this.#roles.find((r) => r.name === roleName)) {
      throw new AccessDeniedError(`User does not have appropriate role: "${roleName}" to access resource`);
    }
  }
}
