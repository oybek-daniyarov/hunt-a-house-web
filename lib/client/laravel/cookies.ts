import 'server-only'

import {cookies} from 'next/headers'
import {decrypt, encrypt} from './crypto'
import {env} from "@/lib/env";
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: false, // Allow JS access for client-side auth check
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

export async function getToken({
    encryptionKey,
}: {
    encryptionKey: string
}): Promise<string | undefined> {
    try {
        const cookieStore = await cookies()
        const encryptedToken = cookieStore.get(env.AUTH_COOKIE_NAME)?.value

        if (!encryptedToken) {
            return undefined
        }

        return decrypt(encryptedToken, encryptionKey)
    } catch (error) {
        console.error('Error getting token:', error)
        return undefined
    }
}

export async function setToken({
    token,
    encryptionKey,
}: {
    token: string
    encryptionKey: string
}): Promise<void> {
    try {
        const cookieStore = await cookies()
        const encryptedToken = encrypt(token, encryptionKey)
        
        // Debug info
        if (process.env.NODE_ENV === 'development') {
            console.log('Setting token:', {
                cookieName: env.AUTH_COOKIE_NAME,
                hasToken: !!encryptedToken,
                options: COOKIE_OPTIONS
            });
        }

        cookieStore.set(env.AUTH_COOKIE_NAME, encryptedToken, COOKIE_OPTIONS)
    } catch (error) {
        console.error('Error setting token:', error)
        throw new Error('Failed to set authentication token')
    }
}

export async function deleteToken(): Promise<void> {
    try {
        const cookieStore = await cookies()
        cookieStore.delete(env.AUTH_COOKIE_NAME)
    } catch (error) {
        console.error('Error deleting token:', error)
    }
} 
