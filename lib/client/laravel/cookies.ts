import 'server-only'

import {cookies} from 'next/headers'
import {decrypt, encrypt} from './crypto'
import {env} from "@/lib/env";

const COOKIE_OPTIONS = {} as const

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
        console.log(error)
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
        cookieStore.set(env.AUTH_COOKIE_NAME, encryptedToken, {
            ...COOKIE_OPTIONS,
        })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to set authentication token')
    }
}

export async function deleteToken(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(env.AUTH_COOKIE_NAME)
} 
