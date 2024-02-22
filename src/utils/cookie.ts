import cookieParser from 'cookie-parser';

export const getCookieValue = (cookies: any, cookieName: string): string => {
    return cookies[cookieName];
};

export const getUnsignedCookie = (parsedCookie: string, cookieSecret: string): string | false => {
    return cookieParser.signedCookie(parsedCookie, cookieSecret);
};

export const validateUnsignedCookie = (unsignedCookie: string | false): boolean => {
    return !(!unsignedCookie || unsignedCookie === 'undefined');
};
