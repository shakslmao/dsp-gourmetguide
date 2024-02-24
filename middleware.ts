import { auth } from "./auth";

export default auth((req) => {
    const userLoggedIn = !!req.auth;
    console.log("Route: ", req.nextUrl.pathname);
    console.log("Route: ", userLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
