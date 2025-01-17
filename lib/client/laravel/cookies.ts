import 'server-only'

import { cookies } from 'next/headers'
import { encrypt, decrypt } from './crypto'

const TOKEN_COOKIE = 'auth_token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 days
} as const

export async function getToken({
  encryptionKey,
}: {
  encryptionKey: string
}): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    const encryptedToken = cookieStore.get(TOKEN_COOKIE)?.value
    
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
  isSecure,
}: {
  token: string
  encryptionKey: string
  isSecure: boolean
}): Promise<void> {
  try {
    const cookieStore = await cookies()
    const encryptedToken = encrypt(token, encryptionKey)
    cookieStore.set(TOKEN_COOKIE, encryptedToken, {
        ...COOKIE_OPTIONS,
        secure: isSecure,
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to set authentication token')
  }
}

export async function deleteToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE)
} 
