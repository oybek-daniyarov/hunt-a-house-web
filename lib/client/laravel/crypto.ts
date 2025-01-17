import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const SALT_LENGTH = 16
const TAG_LENGTH = 16


export function encrypt(text: string, key: string): string {
  const iv = randomBytes(IV_LENGTH)
  const salt = randomBytes(SALT_LENGTH)
  const cipher = createCipheriv(ALGORITHM, Buffer.from(key), iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag()

  // Combine IV, salt, tag, and encrypted data
  return Buffer.concat([
    iv,
    salt,
    tag,
    Buffer.from(encrypted, 'hex')
  ]).toString('base64')
}

export function decrypt(encryptedData: string, key: string): string {
  const buf = Buffer.from(encryptedData, 'base64')
  
  // Extract the parts
  const iv = buf.subarray(0, IV_LENGTH)
  const tag = buf.subarray(IV_LENGTH + SALT_LENGTH, IV_LENGTH + SALT_LENGTH + TAG_LENGTH)
  const encrypted = buf.subarray(IV_LENGTH + SALT_LENGTH + TAG_LENGTH).toString('hex')

  // Create decipher
  const decipher = createDecipheriv(ALGORITHM, Buffer.from(key), iv)
  decipher.setAuthTag(tag)

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
} 