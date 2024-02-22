import { describe, expect, test } from '@jest/globals';

import {
    getSessionData,
    removeSessionData,
    setSessionData
} from '../../../src/utils/session';
import { SESSION_APP_KEY } from '../../../src/config';

const mockSession = (info: any) => {
    const session = {};
    session[SESSION_APP_KEY] = { ...info };
    return session;
};
const appData = { 'a': 1, 'b': 2 };

describe('Utils Session', () => {

    test('Test function getSessionData() when session is null', () => {
        expect(getSessionData(null)).toEqual({});
    });

    test('Test function getSessionData(), it should get user session data', () => {
        expect(getSessionData(mockSession(appData))).toEqual(appData);
    });

    test('Test function setSessionData(), it should set user appData to session object', () => {
        const session = {};
        setSessionData(session, appData);
        expect(session).toEqual({ [SESSION_APP_KEY]: appData });
    });

    test('Test function removeSessionData(), it should remove user session data', () => {
        const session = mockSession(appData);
        removeSessionData(session);
        expect(session).toEqual({ [SESSION_APP_KEY]: null });
    });

});
