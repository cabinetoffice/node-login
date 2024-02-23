# Login

<!-- ![npm](https://img.shields.io/npm/v/%40co-digital%2Flogin) -->
![Static Badge](https://img.shields.io/badge/test_coverage-%E2%89%A595%25-green)

## Overview and Scope

This `@co-digital/login` aims to provide a simple solution for implementing user authentication within within CO Node.js applications. With a focus on security and ease of integration, our solution incorporates a middleware that connects to our internal Identity provider COLA and relatively soon OneLogin.

## Installing

```sh
npm i @co-digital/login
```

### Config variables

Following configs will need to be added as environment variables to the application

Key             |  Description               | Example Value
----------------|--------------------------- |-------------------------
USER_POOL_ID | ID of the user pool in Amazon Cognito | `secret`
USER_POOL_CLIENT_ID | Client ID of an app registered with the user pool in Amazon Cognito | `secret`
AUTH_SIGN_IN_URL | Authentication sign in URL | `https://cola.service.cabinetoffice.gov.uk/v2/<YOUR_SERVICE>/login`
COOKIE_ID_NAME | The name of the cookie | `github-requests` for [github-requests-app](https://github.com/cabinetoffice/github-requests-app)
COOKIE_PARSER_SECRET | Secret used in validating/calculating the cookie signature | `secret`
COOKIE_SESSION_SECRET | Secret key for signing the session cookie | `secret`
LOG_LEVEL       | Logging levels        | `info` (Log only if `info.level` is less than or equal to this level)
HUMAN | Formatting messages form (default JSON) | `true` (Enable human formatting for log messages)

## Files Structure

Directory Path | Description
--- | ---
`./config/` | This folder contains configuration settings for the login module. It is essential for fetching sensitive information such as `COOKIE_PARSER_SECRET` or `COOKIE_SESSION_SECRET`.
`./utils/` | This folder contains utility functions used throughout the login module, including Session and Cookie utils.
`./index.ts` | This file will expose the authentication middleware and Session and Cookie utils.
`./test` | Jest Test files (`*.spec.ts`, `setup.ts`, and `*.mocks.ts`)
Others files | Other files related to modules dependency, CI/CD, *git, lint, test/typescript configs …

## Integration and Getting Started

To integrate our login solution into your Node.js application, follow these simple steps:

- **Install Dependencies**: Begin by installing the necessary dependencies using npm. Ensure that you have `express`, `cookie-parser` and `cookie-session` installed in your project.

```sh
npm i @co-digital/login
```

- **Middleware Configuration**: Configure the module to utilise the associated authentication middleware by incorporating the appropriate environment data and enabling `cookieParser` and `cookieSession` within the application configuration file.

```ts
// On app.ts
...
app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(cookieSession({ secret: COOKIE_SESSION_SECRET }));
...
```

- **Route Setup**: Define routes for any authentication-related endpoints required by your application and utilise the middleware to protect routes that require authentication.

```ts
// On any endpoint when auth is required (eg. home route)
...
import { authentication } from "@co-digital/login";

const homePageRouter = Router();
homePageRouter.get(config.HOME_URL, authentication, get);
...
```

- **Frontend Integration**: `COLA` has already developed user interface components for login, logout, and other authentication-related actions. However, for integration with other Identity Providers (IdPs) such as `GOV.UK One Login`, you'll need to implement these components within your application.

## Note

- `COLA` service that is hosted under the `cabinetoffice.gov.uk` domain. Under the hood, it utilises and abstracts AWS Cognito for user management.

- `cookieParser` method from `cookie-parser` module parses cookie header and populates `req.cookies` with an object keyed by the cookie names. The middleware will parse the cookie header on the request and expose the cookie data as the property `req.signedCookies` if a secret was provided.

- `cookieParser.signedCookie(str, secret)` parses a cookie value as a signed cookie. This will return the parsed unsigned value if it was a signed cookie and the signature was valid. If the value was not signed, the original value is returned. If the value was signed but the signature could not be validated, `false` is returned.

- After the server sends a cookie to a client, the client might modify the cookie before sending it back to the server in a future request. So you sign a cookie if you want assurance that the data being returned in the cookie has not been modified by the client.

- `cookieSession` creates a new cookie session middleware. This middleware will attach the property session to `req`, which provides an object representing the loaded session. This session is either a new session if no valid session was provided in the request, or a loaded session from the request. The `req.session` represents the session for the given request.

```ts
app.use(
  cookieSession({
    // A string which will be used as single key if keys is not provided.
    secret: process.env.COOKIE_SESSION_SECRET,
  })
);
```

### Purpose of cookie-session module

- `cookie-session` does not require any database/resources on the server side, though the total session data cannot exceed the browser's max cookie size.
- `cookie-session` can simplify certain load-balanced scenarios.
- `cookie-session` can be used to store a "light" session and include an identifier to look up a database-backed secondary store to reduce database lookups.

## Contributing

```sh
## Set Node/NPM env
nvm use

## Installing & Building
make build

## Testing & Coverage
make test
#or
make coverage
```
