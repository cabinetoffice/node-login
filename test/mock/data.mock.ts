import { Request } from 'express';
import { SESSION_APP_KEY } from '../../src/config';

export const req = {} as Request;
export const cookieSignedValue = 's:xyz.123';

export const key = 'key';
export const id = '1';
export const mockSession = (appData: any) => {
    const session = {};
    session[SESSION_APP_KEY] = { [key]: [{ ...appData }] };
    return session;
};
export const appData = { 'id': '1', 'a': 1, 'b': 2 };
export const expectedData = { [SESSION_APP_KEY]: { [key]: [{ ...appData }] } };
export const newData = { 'id': '2', 'a': 3, 'b': 3 };
