export default class MethodParams {
  public path: string;
  public target: any;
  public propertyKey: string;
  public role: any;
  public isSecure: boolean;

  constructor(target: any, path: string, propertyKey: string, role?: string | string[], isSecure = true) {
    this.target = target;
    this.path = path;
    this.propertyKey = propertyKey;
    this.role = role;
    this.isSecure = isSecure;
  }
}
