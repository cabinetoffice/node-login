import { NextFunction, Request, Response } from 'express';

import {
    COOKIE_PARSER_SECRET,
    AUTH_SIGN_IN_URL,
    COOKIE_ID_NAME
} from '../../config';
import {
    getCookieValue,
    getUnsignedCookie,
    validateUnsignedCookie
} from '../../utils/cookie';

import { log } from '../../utils/logger';

export const authentication = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const cookieSignedValue = getCookieValue(req.signedCookies, COOKIE_ID_NAME);
        const unsignedCookie = getUnsignedCookie(cookieSignedValue, COOKIE_PARSER_SECRET);

        if (validateUnsignedCookie(unsignedCookie)) {
            log.debugRequest(req, `Successfully verified signature for ${COOKIE_ID_NAME}, cookie value: ${unsignedCookie}`);
        } else {
            log.errorRequest(req, `Failed to verify signature for ${COOKIE_ID_NAME}, cookie value: ${cookieSignedValue}, redirect to ${AUTH_SIGN_IN_URL}`);
            return res.redirect(AUTH_SIGN_IN_URL);
        }

        next();
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
