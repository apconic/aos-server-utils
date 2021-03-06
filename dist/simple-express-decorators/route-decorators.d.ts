export declare function get(path: string, role?: string | string[], isSecure?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function post(path: string, role?: string | string[], isSecure?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function del(path: string, role?: string | string[], isSecure?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function put(path: string, role?: string | string[], isSecure?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function patch(path: string, role?: string | string[], isSecure?: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function controller(name: any, basePath: string): (target: Function) => void;
