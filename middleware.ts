import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {env} from "./lib/env";

// Define auth routes that don't require authentication
const authRoutes = ['/auth/login', '/auth/register'];
const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const token = request.cookies.get(env.AUTH_COOKIE_NAME);
    const isAuthPath = authRoutes.includes(pathname);
    const isProtectedPath = protectedRoutes.includes(pathname);

    // If no token and auth path, clear token
    /*if (token && isAuthPath) {
      await deleteToken();
      return NextResponse.next();
    }*/

    // If token and auth path, redirect to dashboard
    if (token && isAuthPath) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // If token and protected path, continue with request
    if (token && isProtectedPath) {
        return NextResponse.next();
    }

    // If no token and protected path, redirect to login
    if (!token && isProtectedPath) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }


    // If no token and auth path, do nothing
    if (!token && isAuthPath) {
        return NextResponse.next();
    }

    // For all other routes, continue with request
    return NextResponse.next();
}

export const config = {
    // Matcher ignoring api routes and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
