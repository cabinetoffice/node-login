import { SESSION_APP_KEY, KEY_ID } from '../config';

export const getSessionData = (session: any): any => {
    return session?.[SESSION_APP_KEY] || {};
};

export const setSessionData = (session: any, appData: any): void => {
    return session[SESSION_APP_KEY] = { ...appData };
};

export const removeSessionData = (session: any) => {
    session[SESSION_APP_KEY] = null;
};

export const setApplicationData = (session: any, data: any, key: string): void => {
    setSessionData(session, {
        ...getSessionData(session),
        [key]: { ...data }
    });
};

export const setApplicationDataKey = (session: any, data: any, key: string): void => {
    if (!session[SESSION_APP_KEY]) {
        session[SESSION_APP_KEY] = { [key]: [{ ...data }] };
    } else if (!session[SESSION_APP_KEY][key]) {
        session[SESSION_APP_KEY][key] = [{ ...data }];
    } else {
        session[SESSION_APP_KEY][key].push(data);
    }
};

export const getApplicationDataKey = (session: any, key: string): any => {
    const sessionData = getSessionData(session);
    return sessionData?.[key] || [];
};

export const getApplicationDataByID = (session: any, key: string, id: string | undefined): any => {
    const appDataKey = getApplicationDataKey(session, key);

    if (id && appDataKey.length) {
        const index = getIndex(appDataKey, id);

        return appDataKey[index] || {};
    }

    return {};
};

export const setApplicationDataByID = (session: any, data: any, key: string, id: string): void => {
    const appDataKey = getApplicationDataKey(session, key);

    if (id && appDataKey.length) {
        const index = getIndex(appDataKey, id);

        if (index !== -1) {
            session[SESSION_APP_KEY][key][index] = { ...data };
        }
    }
};

export const removeApplicationDataByID = (session: any, key: string, id: string): void => {
    const appDataKey = getApplicationDataKey(session, key);

    if (id && appDataKey.length) {
        const index = getIndex(appDataKey, id);

        if (index !== -1) {
            appDataKey.splice(index, 1);
            session[SESSION_APP_KEY][key] = [ ...appDataKey ];
        }
    }
};

const getIndex = (data: any[], id: string) => {
    return data.findIndex((el: any) => el[KEY_ID] === id);
};
