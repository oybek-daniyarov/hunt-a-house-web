import { NextRequest, NextResponse } from 'next/server';

import { deleteToken, getToken } from '@/lib/client/laravel';
import { getSession } from '@/lib/client/laravel/auth';

// Paths that are accessible to agents only
const AGENT_PATH = '/dashboard/agent';

// Paths that are accessible to users only
const USER_PATH = '/dashboard/user';

// Higher-order function to create auth middleware with custom options
export function withAuth({
  loginRedirectUrl = '/auth/login',
  unauthorizedRedirectUrl = '/dashboard',
  requireAuth = true,
  requiredUserTypes = [],
}: {
  loginRedirectUrl?: string;
  unauthorizedRedirectUrl?: string;
  requireAuth?: boolean;
  requiredUserTypes?: string[];
} = {}) {
  return async function authMiddleware(request: NextRequest) {
    try {
      // Check if auth cookie exists
      const token = await getToken();

      // If no token and auth is required, redirect to log in
      if (!token && requireAuth) {
        return NextResponse.redirect(new URL(loginRedirectUrl, request.url));
      }
      let user = null;
      // If token exists, try to get user data
      if (token) {
        try {
          const { user: data, success } = await getSession({
            headers: request.headers,
          });
          console.log('User data:', data);
          user = data;
          if (requireAuth && !success) {
            token && (await deleteToken());
            console.log('Session cleared');
            return NextResponse.redirect(
              new URL(loginRedirectUrl, request.url)
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      // If auth is required but no user was found, redirect to login
      if (requireAuth && !user) {
        //token && (await deleteToken());
        return NextResponse.redirect(new URL(loginRedirectUrl, request.url));
      }

      // If user exists, and we have required user types, check if user has the required type
      if (user && requiredUserTypes.length > 0) {
        if (!requiredUserTypes.includes(user.userType)) {
          return NextResponse.redirect(
            new URL(unauthorizedRedirectUrl, request.url)
          );
        }
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      // If there's any error and auth is required, redirect to login
      if (requireAuth) {
        return NextResponse.redirect(new URL(loginRedirectUrl, request.url));
      }
      return NextResponse.next();
    }
  };
}

// Create specialized middleware for different routes
const agentMiddleware = withAuth({
  requiredUserTypes: ['agent'],
});

const userMiddleware = withAuth({
  requiredUserTypes: ['user'],
});

const defaultMiddleware = withAuth();

// Main middleware function that routes to the appropriate specialized middleware
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Use agent middleware for agent-only paths
  if (path.startsWith(AGENT_PATH)) {
    return agentMiddleware(request);
  }

  // Use user middleware for user-only paths
  if (path.startsWith(USER_PATH)) {
    return userMiddleware(request);
  }

  // Use default middleware for all other dashboard paths
  return defaultMiddleware(request);
}

// Configure middleware to run on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
