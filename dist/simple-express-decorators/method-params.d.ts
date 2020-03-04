export default class MethodParams {
    path: string;
    target: any;
    propertyKey: string;
    role: any;
    isSecure: boolean;
    constructor(target: any, path: string, propertyKey: string, role?: string | string[], isSecure?: boolean);
}
