jest.mock('cookie-parser');

import { jest, describe, expect, test, afterEach } from '@jest/globals';
import cookieParser from 'cookie-parser';

import {
    getCookieValue,
    getUnsignedCookie,
    validateUnsignedCookie
} from '../../../src/utils/cookie';
import {
    COOKIE_ID_NAME,
    COOKIE_PARSER_SECRET
} from '../../../src/config';

const cookieParserSignedCookieMock = cookieParser.signedCookie as jest.Mock;

const mockCookie = (info: string) => {
    const cookies = {};
    cookies[COOKIE_ID_NAME] = info;
    return cookies;
};
const mockCookieValue = '123oQCS75NUe4OVK78';

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

});
