jest.mock('../../../../src/utils/cookie');
jest.mock('../../../../src/utils/logger', () => ({
    log: {
        debugRequest: jest.fn(),
        errorRequest: jest.fn()
    }
}));

import { describe, expect, test, jest, afterEach, beforeEach } from '@jest/globals';
import { Response, NextFunction } from 'express';

import * as config from '../../../../src/config';

import { authentication } from '../../../../src/middleware/cola/authentication.middleware';
import { log } from '../../../../src/utils/logger';
import {
    getCookieValue,
    getUnsignedCookie,
    validateUnsignedCookie
} from '../../../../src/utils/cookie';
import { cookieSignedValue, req } from '../../../mock/data.mock';

const logDebugRequestMock = log.debugRequest as jest.Mock;
const logErrorRequestMock = log.errorRequest as jest.Mock;

const getCookieValueMock = getCookieValue as jest.Mock;
const getUnsignedCookieMock = getUnsignedCookie as jest.Mock;
const validateUnsignedCookieMock = validateUnsignedCookie as jest.Mock;

export const mockResponse = () => {
    const res = {} as Response;
    res.redirect = jest.fn() as any;
    return res;
};

export const next = jest.fn() as NextFunction;

describe('Cola Authentication Middleware test suites', () => {

    let res: any;

    beforeEach(() => {
        res = mockResponse();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test(`Should redirect to ${config.AUTH_SIGN_IN_URL} if unsignedCookie is not valid`, () => {
        getCookieValueMock.mockReturnValueOnce(cookieSignedValue);
        validateUnsignedCookieMock.mockReturnValueOnce(false);

        const errMsg1 = `Failed to verify signature for ${config.COOKIE_ID_NAME}, cookie `;
        const errMsg2 = `value: ${cookieSignedValue}, redirect to ${config.AUTH_SIGN_IN_URL}`;

        authentication(req, res, next);

        expect(logErrorRequestMock).toHaveBeenCalledTimes(1);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, errMsg1 + errMsg2);
        expect(getCookieValueMock).toHaveBeenCalledTimes(1);
        expect(getUnsignedCookieMock).toHaveBeenCalledTimes(1);

        expect(res.redirect).toHaveBeenCalledTimes(1);
        expect(res.redirect).toHaveBeenCalledWith(config.AUTH_SIGN_IN_URL);

        expect(logDebugRequestMock).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(0);
    });

    test('should call next and log message if validation is successful', () => {
        const unsignedCookie = 'xyz.123';

        const logMsg = `Successfully verified signature for ${config.COOKIE_ID_NAME}, cookie value:`;

        getUnsignedCookieMock.mockReturnValueOnce(unsignedCookie);
        validateUnsignedCookieMock.mockReturnValueOnce(true);

        authentication(req, res, next);

        expect(logDebugRequestMock).toHaveBeenCalledTimes(1);
        expect(logDebugRequestMock).toHaveBeenCalledWith(req, `${logMsg} ${unsignedCookie}`);
        expect(getCookieValueMock).toHaveBeenCalledTimes(1);
        expect(getUnsignedCookieMock).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(1);

        expect(logErrorRequestMock).toHaveBeenCalledTimes(0);
        expect(res.redirect).toHaveBeenCalledTimes(0);
    });

    test('should call next with error object if error is thrown', () => {
        getCookieValueMock.mockReturnValueOnce(cookieSignedValue);
        validateUnsignedCookieMock.mockReturnValueOnce(false);

        const errMsg1 = `Failed to verify signature for ${config.COOKIE_ID_NAME}, cookie `;
        const errMsg2 = `value: ${cookieSignedValue}, redirect to ${config.AUTH_SIGN_IN_URL}`;
        const errMsg3 = 'Error thrown by res.redirect!';

        const resWithError = { ...res };
        resWithError.redirect = jest.fn(() => { throw new Error(errMsg3); });

        authentication(req, resWithError, next);

        const errObj = expect.objectContaining({ message: errMsg3 });

        expect(logErrorRequestMock).toHaveBeenCalledTimes(2);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, errMsg1 + errMsg2);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, errMsg3);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(errObj);
    });
});
