interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  AUTH_COOKIE_NAME: string;
  BACKEND_API_URL: string;
}

const requiredEnvVars = {
  BACKEND_API_URL: process.env.BACKEND_API_URL,
} as const;

// Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Export validated environment variables
export const env: EnvVars = {
  NODE_ENV: (process.env.NODE_ENV as EnvVars['NODE_ENV']) || 'development',
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || 'auth_token',
  BACKEND_API_URL: process.env.BACKEND_API_URL!,
};
