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
import { getUnsignedCookie } from './utils/cookie';

export {
    colaAuthenticationMiddleware,
    getUnsignedCookie,
    removeSessionData,
    getSessionData,
    setSessionData,
    setApplicationDataKey,
    getApplicationDataKey,
    getApplicationDataByID,
    setApplicationDataByID,
    removeApplicationDataByID
};
