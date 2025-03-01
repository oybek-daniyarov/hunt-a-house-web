import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/data/laravel/auth/auth.api';

// Paths that are accessible to agents only
const AGENT_PATHS = ['/dashboard/leads'];

// Paths that are accessible to users only
const USER_PATHS = ['/dashboard/my-leads'];

export async function middleware(request: NextRequest) {
  try {
    const { data: user } = await getCurrentUser();

    console.log('user', user);

    // If no user is logged in, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const path = request.nextUrl.pathname;

    // Check if the path is agent-only and user is not an agent
    if (
      AGENT_PATHS.some((p) => path.startsWith(p)) &&
      user.userType !== 'agent'
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Check if the path is user-only and user is not a regular user
    if (
      USER_PATHS.some((p) => path.startsWith(p)) &&
      user.userType !== 'user'
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's any error, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
export const config = {
  matcher: ['/dashboard/:path*'],
};
