'use server';

import { revalidatePath } from 'next/cache';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { env } from '@/lib/env';
import { decrypt, encrypt } from './crypto';

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true, // Secure against XSS
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 days
  domain: process.env.DOMAIN ?? 'localhost',
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

export async function getToken({
  encryptionKey,
}: {
  encryptionKey: string;
}): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const encryptedToken = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

    if (!encryptedToken) {
      return undefined;
    }

    return await decrypt(encryptedToken, encryptionKey);
  } catch (error) {
    console.error('Error getting token:', error);
    return undefined;
  }
}

export async function setToken({
  token,
  encryptionKey,
}: {
  token: string;
  encryptionKey: string;
}): Promise<void> {
  try {
    const cookieStore = await cookies();
    const encryptedToken = await encrypt(token, encryptionKey);

    // Debug info
    if (process.env.NODE_ENV === 'development') {
      console.log('Setting token:', {
        cookieName: env.AUTH_COOKIE_NAME,
        hasToken: !!encryptedToken,
        options: COOKIE_OPTIONS,
      });
    }

    cookieStore.set(env.AUTH_COOKIE_NAME, encryptedToken, COOKIE_OPTIONS);
  } catch (error) {
    console.error('Error setting token:', error);
    throw new Error('Failed to set authentication token');
  }
}

export async function deleteToken(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(env.AUTH_COOKIE_NAME, '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0),
    });
    revalidatePath('/');
    console.log('Token deleted');
  } catch (error) {
    console.error('Error deleting token:', error);
  }
}
