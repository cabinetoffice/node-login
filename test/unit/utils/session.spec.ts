import { describe, expect, test } from '@jest/globals';

import {
    getApplicationDataByID,
    getApplicationDataKey,
    getSessionData,
    removeApplicationDataByID,
    removeSessionData,
    setApplicationDataByID,
    setApplicationDataKey,
    setSessionData
} from '../../../src/utils/session';
import { SESSION_APP_KEY } from '../../../src/config';
import {
    mockSession,
    appData,
    key,
    expectedData,
    newData,
    id
} from '../../mock/data.mock';

describe('Utils Session', () => {

    test('Test function getSessionData() when session is null', () => {
        expect(getSessionData(null)).toEqual({});
    });

    test('Test function getSessionData(), it should get user session data', () => {
        expect(getSessionData(mockSession(appData))).toEqual({ [key]: [appData] });
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

    test('Test function setApplicationDataKey(), it should return user session data when session is empty', () => {
        const session = {};
        setApplicationDataKey(session, appData, key);
        expect(session).toEqual(expectedData);
    });

    test('Test function setApplicationDataKey(), it should return user session data when session is init with empty object', () => {
        const session = { [SESSION_APP_KEY]: {} };
        setApplicationDataKey(session, appData, key);
        expect(session).toEqual(expectedData);
    });

    test('Test function setApplicationDataKey(), it should return user session data when session already populated', () => {
        const session = mockSession(appData);
        const tmpExpectedData = { ...expectedData };
        tmpExpectedData[SESSION_APP_KEY][key].push(newData);

        setApplicationDataKey(session, newData, key);
        expect(session).toEqual(tmpExpectedData);
    });

    test('Test function getApplicationDataKey(), it should return empty array when session empty', () => {
        const response = getApplicationDataKey({}, key);
        expect(response).toEqual([]);
    });

    test('Test function getApplicationDataKey(), it should return user session data for the key', () => {
        const session = mockSession(appData);
        const response = getApplicationDataKey(session, key);
        expect(response).toEqual([appData]);
    });

    test('Test function getApplicationDataByID(), it should return empty object', () => {
        const session = mockSession(appData);
        const response = getApplicationDataByID(session, key, undefined);
        expect(response).toEqual({});
    });

    test('Test function getApplicationDataByID(), it should return the id element on session object', () => {
        const session = mockSession(appData);
        const response = getApplicationDataByID(session, key, id);
        expect(response).toEqual(appData);
    });

    test('Test function getApplicationDataByID(), it should return empty object if id not on session', () => {
        const session = mockSession(appData);
        const response = getApplicationDataByID(session, key, 'wrong_id');
        expect(response).toEqual({});
    });

    test('Test function setApplicationDataByID(), it should left the session empty', () => {
        const session = {};
        setApplicationDataByID(session, appData, key, undefined);
        expect(session).toEqual({});
    });

    test('Test function setApplicationDataByID(), it should change the id element on session object with new data', () => {
        const session = mockSession(appData);
        setApplicationDataByID(session, newData, key, id);
        expect(session).toEqual(
            { [SESSION_APP_KEY]: { [key]: [newData] } }
        );
    });

    test('Test function removeApplicationDataByID(), it should left the session as it is (empty)', () => {
        const session = {};
        removeApplicationDataByID(session, key, undefined);
        expect(session).toEqual({});
    });

    test('Test function removeApplicationDataByID(), it should remove the id element on key session object', () => {
        const session = mockSession(appData);
        removeApplicationDataByID(session, key, id);
        expect(session).toEqual(
            { [SESSION_APP_KEY]: { [key]: [] } }
        );
    });

    test('Test function removeApplicationDataByID(), it should not remove the element', () => {
        const session = mockSession(appData);
        removeApplicationDataByID(session, key, 'wrong_id');
        expect(session).toEqual(session);
    });

});
