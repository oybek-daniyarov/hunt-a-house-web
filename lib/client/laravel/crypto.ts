'use server';

import { EncryptJWT, jwtDecrypt } from 'jose';

// Use a more secure secret key generation
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || '0'.repeat(32)
);

export async function encrypt(text: string): Promise<string> {
  const jwt = await new EncryptJWT({ data: text })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('30d') // Match cookie expiration
    .encrypt(SECRET);

  return jwt;
}

export async function decrypt(encryptedData: string): Promise<string> {
  const { payload } = await jwtDecrypt(encryptedData, SECRET);
  return payload.data as string;
}
