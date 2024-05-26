/**
 * These routes do not require authentication 
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
];
/**
 * these routes used for authentication
 * These routes redirect logged in users to settings page
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];
/**
 * these routes used for API  authentication routes
 * The routes starts with this prefix are used for API authentication purpose
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * default page after logged in 
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";