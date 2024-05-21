jest.mock('cookie-parser');
jest.mock('jwt-decode');

import { jest, describe, expect, test, afterEach } from '@jest/globals';
import cookieParser from 'cookie-parser';

import {
    getCookieValue,
    getUnsignedCookie,
    getUserEmailFromColaJwt,
    validateUnsignedCookie
} from '../../../src/utils/cookie';
import {
    COOKIE_ID_NAME,
    COOKIE_PARSER_SECRET
} from '../../../src/config';
import { jwtDecode } from 'jwt-decode';

const cookieParserSignedCookieMock = cookieParser.signedCookie as jest.Mock;
const jwtDecodeMock = jwtDecode as jest.Mock;

const mockCookie = (info: string) => {
    const cookies = {};
    cookies[COOKIE_ID_NAME] = info;
    return cookies;
};
const mockCookieValue = '123oQCS75NUe4OVK78';

const mockJwt = 'ey4590u82035577';
const mockDecodedColaJwt = {
    email: 'email@fake.com'
};

describe('Utils Cookies', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Test function getCookieValue(), return value of the cookie', () => {
        expect(getCookieValue(mockCookie(mockCookieValue), COOKIE_ID_NAME)).toEqual(mockCookieValue);
    });

    test('Test function getUnsignedCookie(), it should get unsigned cookie value', () => {
        getUnsignedCookie(mockCookieValue, COOKIE_PARSER_SECRET);

        expect(cookieParserSignedCookieMock).toHaveBeenCalledTimes(1);
        expect(cookieParserSignedCookieMock).toHaveBeenCalledWith(mockCookieValue, COOKIE_PARSER_SECRET);
    });

    test('Test function validateUnsignedCookie(), it should be false if "undefined" passed', () => {
        const isValidCookie = validateUnsignedCookie('undefined');
        expect(isValidCookie).toBeFalsy;
    });

    test('Test function validateUnsignedCookie(), it should be false if "false" passed', () => {
        const isValidCookie = validateUnsignedCookie(false);
        expect(isValidCookie).toBeFalsy;
    });

    test('Test function validateUnsignedCookie(), it should be true if correct cookie passed', () => {
        const isValidCookie = validateUnsignedCookie(mockCookieValue);
        expect(isValidCookie).toBeTruthy;
    });

    test('Test function getUserEmailFromColaJwt(), it should call jwtDecode with jwt passed in', () => {

        getUserEmailFromColaJwt(mockJwt);

        expect(jwtDecodeMock).toHaveBeenCalledTimes(1);
        expect(jwtDecodeMock).toHaveBeenCalledWith(mockJwt);
    });

    test('Test function getUserEmailFromColaJwt(), it should return email property value from decoded JWT', () => {

        jwtDecodeMock.mockReturnValue(mockDecodedColaJwt);

        const email = getUserEmailFromColaJwt(mockJwt);

        expect(email).toBe(mockDecodedColaJwt.email);
    });

    test('Test function getUserEmailFromColaJwt(), it should return undefined if email property is not present on decodedJWT', () => {

        jwtDecodeMock.mockReturnValue({});

        const email = getUserEmailFromColaJwt(mockJwt);

        expect(email).toBe(undefined);
    });

});
