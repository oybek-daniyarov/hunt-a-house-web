import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {env} from "./lib/env";

// Define auth routes that don't require authentication
const authRoutes = ['/auth/login', '/auth/register'];
const protectedRoutes = ['/dashboard'];

type CookieToken = {
    name: string;
    value: string;
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const token = request.cookies.get(env.AUTH_COOKIE_NAME) as CookieToken | undefined;
    const isAuthPath = authRoutes.includes(pathname);
    const isProtectedPath = protectedRoutes.includes(pathname);

    // Check if token exists and has a value
    const hasValidToken = token && token.value && token.value.length > 0;

    // If we have a valid token and trying to access auth paths, redirect to dashboard
    if (hasValidToken && isAuthPath) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // If we have a valid token and accessing protected paths, allow access
    if (hasValidToken && isProtectedPath) {
        return NextResponse.next();
    }

    // If no valid token and trying to access protected paths, redirect to login
    if (!hasValidToken && isProtectedPath) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow access to auth paths when no token
    if (!hasValidToken && isAuthPath) {
        return NextResponse.next();
    }

    // For all other routes, continue with request
    return NextResponse.next();
}

export const config = {
    // Matcher ignoring api routes and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
