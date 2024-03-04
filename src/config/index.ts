import { getEnvironmentValue } from '../utils/env';

export const SERVICE_NAME = 'Authentication Middleware';
export const SESSION_APP_KEY = getEnvironmentValue('SESSION_APP_KEY', 'git');
export const KEY_ID = getEnvironmentValue('KEY_ID', 'id');

export const AUTH_SIGN_IN_URL = getEnvironmentValue('AUTH_SIGN_IN_URL');

export const SESSION_ID_NAME = getEnvironmentValue('SESSION_ID_NAME');
export const COOKIE_PARSER_SECRET = getEnvironmentValue('COOKIE_PARSER_SECRET');
export const COOKIE_ID_NAME = getEnvironmentValue('COOKIE_ID_NAME');

export const USER_POOL_ID = getEnvironmentValue('USER_POOL_ID');
export const USER_POOL_CLIENT_ID = getEnvironmentValue('USER_POOL_CLIENT_ID');
