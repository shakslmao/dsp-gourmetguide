import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { LOGIN_REDIRECT, publicRoutes, authenticatedRoutes, apiAuthPrefix } from "@/routes";

// Initialise NextAuth with the authentication configuration
const { auth } = NextAuth(authConfig);

// The default export is a middleware function that handles authentication
export default auth((req) => {
    // Extract the URL the user is trying to access
    const { nextUrl } = req;
    // Determine if the user is logged in by checking the presence of auth object
    const userLoggedIn = !!req.auth;

    // Check if the request is for an API route that requires authentication
    const apiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // Check if the requested route is publicly accessible
    const publicRoute = publicRoutes.includes(nextUrl.pathname);
    // Check if the requested route requires authentication
    const authRoute = authenticatedRoutes.includes(nextUrl.pathname);

    // If the request is for an API authentication route, proceed without further checks
    if (apiAuthRoute) {
        return;
    }

    // If the route requires authentication, redirect logged-out users to the login page
    if (authRoute) {
        if (userLoggedIn) {
            // Redirect the user to the specified login redirect URL
            return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    // If the user is not logged in and the route is not public, redirect to login
    if (!userLoggedIn && !publicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    // For all other cases, no specific action is required
    return;
});

// Configuration to optionally exclude certain paths from invoking this middleware
export const config = {
    // The matcher array specifies patterns for routes to match or exclude
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
