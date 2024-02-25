import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const userLoggedIn = !!req.auth;
    console.log("Route: ", req.nextUrl.pathname);
    console.log("Route (Is Logged in): ", userLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
