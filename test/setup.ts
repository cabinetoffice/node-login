export default () => {
    process.env.LOG_LEVEL = 'info';
    process.env.HUMAN = 'true';
    process.env.COOKIE_PARSER_SECRET = 'test';
    process.env.COOKIE_SESSION_SECRET = 'test';
    process.env.AUTH_SIGN_IN_URL = 'test';
    process.env.SESSION_ID_NAME = 'test';
    process.env.COOKIE_ID_NAME = 'test';
    process.env.USER_POOL_ID = 'test';
    process.env.USER_POOL_CLIENT_ID = 'test';
    process.env.SESSION_APP_KEY = 'test';
    process.env.TEST_KEY = 'test';
    process.env.UNSANITISED_TEST_KEY = '   test      ';
};
