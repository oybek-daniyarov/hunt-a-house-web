'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { decrypt, encrypt } from '@/lib/client/laravel/crypto';
import { env } from '@/lib/env';
import { COOKIE_OPTIONS } from './contants';

export async function getToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return undefined;
    }

    return await decrypt(token);
  } catch (error) {
    console.error('Error getting token:', error);
    return undefined;
  }
}

export async function setToken({ token }: { token: string }): Promise<void> {
  try {
    const cookieStore = await cookies();

    cookieStore.set(env.AUTH_COOKIE_NAME, await encrypt(token), COOKIE_OPTIONS);
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

    // Delete the cookie again with a different approach as fallback
    cookieStore.delete(env.AUTH_COOKIE_NAME);

    revalidatePath('/');
    console.log('Token deleted successfully');
  } catch (error) {
    console.error('Error deleting token:', error);
    throw new Error('Failed to delete authentication token');
  }
}
