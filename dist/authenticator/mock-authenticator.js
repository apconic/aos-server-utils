import { UserTypes, MockUser } from './users/index.js';
import lodash from 'lodash';
const { trim, isString } = lodash;
import HomeServerAuthenticator from './home-server-authenticator.js';
class MockAuthenticator {
    getMiddleware() {
        return [(request, response, next) => next()];
    }
    async getUser(request) {
        const accessToken = this.getAccessToken(request);
        if (accessToken) {
            // User real authenticator when there's access token
            return new HomeServerAuthenticator().getUser(request);
        }
        else {
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
    getCurrentBU(req, businessUnits) {
        let currentBU = trim(req.headers['current-bu']);
        if (!isString(currentBU) || currentBU.length === 0) {
            console.info("'current-bu' header not provided. Using value 'Primary'");
            currentBU = 'Primary';
        }
        if (!businessUnits.includes(currentBU)) {
            throw new Error(`'current-bu':${currentBU} not found in user's 'business-units':${businessUnits}`);
        }
        return currentBU;
    }
    getTransporterCode(request, userType) {
        const code = request.headers['transporter-code'];
        if (userType === UserTypes.Transporter) {
            if (!isString(code)) {
                throw new Error(`${userType} user has no 'transporter-code' header`);
            }
            return code;
        }
    }
    getType(request) {
        const type = request.headers['user-type'];
        if (!type) {
            console.info(`'user-type' header not provided. Using ${UserTypes.Normal}. Available values:${Object.values(UserTypes)}`);
            return UserTypes.Normal;
        }
        return type;
    }
    getUsername(request) {
        const name = request.headers['preferred-username'];
        if (!name) {
            console.info("'preferred-username' header not provided. Using 'MOCK-USER' as username");
            return 'MOCK-USER';
        }
        return name;
    }
    getBusinessUnits(request) {
        const businessUnits = request.headers['business-units'];
        if (!isString(businessUnits) || businessUnits.length === 0) {
            console.info("'business-units' header not provided. Using ['Primary'] business units");
            return ['Primary'];
        }
        return businessUnits.split(',').map((code) => trim(code));
    }
    getAccessToken(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        return authHeader.substring('Bearer '.length);
    }
}
export default MockAuthenticator;
