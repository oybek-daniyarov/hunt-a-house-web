import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "./lib/env";

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard'];
// Define auth routes that should redirect to dashboard if authenticated
const authRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is protected or auth-related
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(pathname);

    try {
        const token = request.cookies.get(env.AUTH_COOKIE_NAME);
        const isAuthenticated = token !== undefined && token.value !== '';

        // Debug info in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Auth Middleware:', {
                pathname,
                isProtectedRoute,
                isAuthRoute,
                isAuthenticated,
                hasToken: !!token
            });
        }

        // If accessing protected route without auth, redirect to login
        if (isProtectedRoute && !isAuthenticated) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // If accessing auth routes while authenticated, redirect to dashboard
        if (isAuthRoute && isAuthenticated) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware Error:', error);
        // On error, redirect to login for protected routes
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    // Matcher ignoring api routes and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
