'use server';

import { revalidatePath } from 'next/cache';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { env } from '@/lib/env';

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true, // Secure against XSS
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 days
};

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(env.AUTH_COOKIE_NAME);
    return token !== undefined && token.value !== '';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

export async function getToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return undefined;
    }

    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return undefined;
  }
}

export async function setToken({ token }: { token: string }): Promise<void> {
  try {
    const cookieStore = await cookies();

    // Debug info
    if (process.env.NODE_ENV === 'development') {
      console.log('Setting token:', {
        cookieName: env.AUTH_COOKIE_NAME,
        hasToken: !!token,
        options: COOKIE_OPTIONS,
      });
    }

    cookieStore.set(env.AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
  } catch (error) {
    console.error('Error setting token:', error);
    throw new Error('Failed to set authentication token');
  }
}

export async function deleteToken(): Promise<void> {
  try {
    const cookieStore = await cookies();

    // Debug info
    if (process.env.NODE_ENV === 'development') {
      console.log('Deleting token:', {
        cookieName: env.AUTH_COOKIE_NAME,
        options: {
          ...COOKIE_OPTIONS,
          maxAge: 0,
          expires: new Date(0),
        },
      });
    }

    // Delete the cookie by setting maxAge to 0 and expires to past date
    cookieStore.set(env.AUTH_COOKIE_NAME, '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });

    // Delete the cookie again with a different approach as fallback
    cookieStore.delete(env.AUTH_COOKIE_NAME);

    revalidatePath('/');
    console.log('Token deleted successfully');
  } catch (error) {
    console.error('Error deleting token:', error);
    throw new Error('Failed to delete authentication token');
  }
}
