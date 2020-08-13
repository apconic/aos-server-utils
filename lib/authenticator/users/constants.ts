export enum UserTypes {
  Transporter = 'TRANSPORTER',
  Normal = 'NORMAL',
  Party = 'PARTY',
  Driver = 'DRIVER',
}

export interface UserDetails {
  preferredUsername: string;
  businessUnits?: string[];
  transporterCode?: string;
  type: UserTypes;
  currentBusinessUnit?: string;
  roles?: Array<{ name: string }>;
}
