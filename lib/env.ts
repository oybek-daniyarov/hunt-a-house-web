interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test'
  AUTH_COOKIE_NAME: string
  ENCRYPTION_KEY: string
  BACKEND_API_URL: string
}

const requiredEnvVars = {
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  BACKEND_API_URL: process.env.BACKEND_API_URL,
} as const

// Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

// Validate ENCRYPTION_KEY length
if (process.env.ENCRYPTION_KEY?.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be exactly 32 characters long')
}

// Export validated environment variables
export const env: EnvVars = {
  NODE_ENV: (process.env.NODE_ENV as EnvVars['NODE_ENV']) || 'development',
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || 'auth_token',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY!,
  BACKEND_API_URL: process.env.BACKEND_API_URL!,
} 