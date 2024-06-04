import {
    getSessionData,
    setSessionData,
    removeSessionData,
    setApplicationDataKey,
    getApplicationDataKey,
    getApplicationDataByID,
    setApplicationDataByID,
    removeApplicationDataByID
} from './utils/session';
import { authentication as colaAuthenticationMiddleware } from './middleware/cola/authentication.middleware';
import { getCookieValue, getUnsignedCookie, getUserEmailFromColaJwt } from './utils/cookie';

export {
    colaAuthenticationMiddleware,
    getCookieValue,
    getUnsignedCookie,
    getUserEmailFromColaJwt,
    removeSessionData,
    getSessionData,
    setSessionData,
    setApplicationDataKey,
    getApplicationDataKey,
    getApplicationDataByID,
    setApplicationDataByID,
    removeApplicationDataByID
};
