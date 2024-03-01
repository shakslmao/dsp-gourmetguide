/**
 *  Routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification", "/auth/new-password"];

/**
 *  Routes that are used for authentication, they will be redirected to the home page if the user is already authenticated
 * @type {string[]}
 */

export const authenticatedRoutes = [
    "/auth/login",
    "/inital-preferences/cuisinepreferences",
    "inital-preferences/dietarypreferences",
    "/inital-preferences/register",
    "/auth/error",
    "/auth/reset",
];

/**
 *  Routes that are for API authentication purposes,
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *  Default redirect for login
 * @type {string[]}
 */
export const LOGIN_REDIRECT = "/dashboard";
