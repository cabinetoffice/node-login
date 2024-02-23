import { SESSION_APP_KEY } from '../config';

export const getSessionData = (session: any): any => {
    return session?.[SESSION_APP_KEY] || {};
};

export const setSessionData = (session: any, appData: any): void => {
    return session[SESSION_APP_KEY] = { ...appData };
};

export const removeSessionData = (session: any) => {
    session[SESSION_APP_KEY] = null;
};
