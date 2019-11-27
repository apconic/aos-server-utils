export default class MethodParams {
  path: string;
  target: any;
  propertyKey: string;
  role: any;
  isSecure: boolean;
  constructor(
    target: any,
    path: string,
    propertyKey: string,
    role?: any,
    isSecure: boolean = true
  ) {
    this.target = target;
    this.path = path;
    this.propertyKey = propertyKey;
    this.role = role;
    this.isSecure = isSecure;
  }
}
