import Authenticator from './authenticator';
import { Request } from 'express';
import { UserTypes, User, MockUser } from './users';
import { isString, trim } from 'lodash';
import HomeServerAuthenticator from './home-server-authenticator';

class MockAuthenticator implements Authenticator {
  public getMiddleware() {
    return [(request, response, next) => next()];
  }

  public async getUser(request: Request): Promise<User> {
    const accessToken = this.getAccessToken(request);
    if (accessToken) {
      // User real authenticator when there's access token
      return new HomeServerAuthenticator().getUser(request);
    } else {
      const preferredUsername = this.getUsername(request);
      const businessUnits = this.getBusinessUnits(request);
      const type = this.getType(request);
      const currentBusinessUnitCode = this.getCurrentBU(request, businessUnits);
      const transporterCode = this.getTransporterCode(request, type);
      return new MockUser({
        currentBusinessUnit: currentBusinessUnitCode,
        preferredUsername,
        businessUnits,
        type,
        transporterCode,
      });
    }
  }

  private getCurrentBU(req: Request, businessUnits: string[]): string {
    let currentBU = trim(req.headers['current-bu'] as string);
    if (!isString(currentBU) || currentBU.length === 0) {
      console.info("'current-bu' header not provided. Using value 'Primary'");
      currentBU = 'Primary';
    }

    if (!businessUnits.includes(currentBU)) {
      throw new Error(`'current-bu':${currentBU} not found in user's 'business-units':${businessUnits}`);
    }

    return currentBU;
  }

  private getTransporterCode(request: Request, userType: UserTypes): string | undefined {
    const code = request.headers['transporter-code'] as string;
    if (userType === UserTypes.Transporter) {
      if (!isString(code)) {
        throw new Error(`${userType} user has no 'transporter-code' header`);
      }

      return code;
    }
  }

  private getType(request: Request): UserTypes {
    const type = request.headers['user-type'] as UserTypes;
    if (!type) {
      console.info(
        `'user-type' header not provided. Using ${UserTypes.Normal}. Available values:${Object.values(UserTypes)}`,
      );
      return UserTypes.Normal;
    }

    return type;
  }

  private getUsername(request: any): string {
    const name = request.headers['preferred-username'] as UserTypes;
    if (!name) {
      console.info("'preferred-username' header not provided. Using 'MOCK-USER' as username");
      return 'MOCK-USER';
    }

    return name;
  }

  private getBusinessUnits(request: Request): string[] {
    const businessUnits = request.headers['business-units'] as string;
    if (!isString(businessUnits) || businessUnits.length === 0) {
      console.info("'business-units' header not provided. Using ['Primary'] business units");
      return ['Primary'];
    }

    return businessUnits.split(',').map((code) => trim(code));
  }

  private getAccessToken(request) {
    const authHeader: string = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    return authHeader.substring('Bearer '.length);
  }
}

export default MockAuthenticator;
