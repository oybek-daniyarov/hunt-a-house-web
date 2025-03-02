// used to check if the user is logged in

import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_OPTIONS } from '@/lib/client/laravel/contants';
import { getCurrentUser, logout } from '@/lib/data/laravel/auth/auth.api';
import { env } from '@/lib/env';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get(env.AUTH_COOKIE_NAME)?.value;

    // Check if the user is authenticated
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          isAuthenticated: false,
          message: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // Try to get the current user data if token exists
    try {
      const userResponse = await getCurrentUser();

      if (userResponse.success && userResponse.data) {
        // Return success with user data
        return NextResponse.json({
          success: true,
          isAuthenticated: true,
          user: userResponse.data,
        });
      }
    } catch (userError) {
      console.error('Error fetching user data:', userError);
      // Continue with basic authentication response if user data fetch fails
    }

    // Return basic success response if user data couldn't be fetched
    return NextResponse.json({
      success: false,
      isAuthenticated: false,
    });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json(
      {
        success: false,
        isAuthenticated: false,
        message: 'Failed to check authentication',
      },
      { status: 500 }
    );
  }
}

// Set session (create or update)
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    // Create response with success message
    const response = NextResponse.json({
      success: true,
      message: 'Session created successfully',
    });

    // Set the auth token cookie
    response.cookies.set(env.AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Error setting session:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to set session' },
      { status: 500 }
    );
  }
}

// Delete session
export async function DELETE() {
  // Create response with success message
  const response = NextResponse.json({
    success: true,
    message: 'Session deleted successfully',
  });

  await logout();

  // Delete the auth token cookie
  response.cookies.set(env.AUTH_COOKIE_NAME, '', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
