import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true, // Secure against XSS
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 days
};
