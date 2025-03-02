'use server';

import { headers } from 'next/headers';

/**
 * Checks if the user is authenticated by verifying the session
 * @returns Promise with authentication status and user data if available
 */
export async function checkSession(): Promise<{
  success: boolean;
  isAuthenticated: boolean;
  user?: App.Data.User.UserData;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/session`,
      {
        method: 'GET',
        credentials: 'include', // Important: This forwards cookies with the request
        headers: await headers(),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error checking session:', error);
    return {
      success: false,
      isAuthenticated: false,
      message: 'Failed to check authentication status',
    };
  }
}

/**
 * Sets the authentication token in cookies via the API
 * @param token The authentication token to set
 * @returns Promise with success status
 */
export async function setSession(token: string): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    if (!token) {
      return {
        success: false,
        message: 'Token is required',
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/session`,
      {
        method: 'POST',
        credentials: 'include', // Important: This forwards cookies with the request
        headers: await headers(),
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to set session',
      };
    }

    console.log('session set', response.headers);

    return await response.json();
  } catch (error) {
    console.error('Error setting session:', error);
    return {
      success: false,
      message: 'Failed to set authentication token',
    };
  }
}

/**
 * Clears the authentication session
 * @returns Promise with success status
 */
export async function clearSession(): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/session`,
      {
        method: 'DELETE',
        credentials: 'include', // Important: This forwards cookies with the request
        headers: await headers(),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to clear session',
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error clearing session:', error);
    return {
      success: false,
      message: 'Failed to clear authentication token',
    };
  }
}
