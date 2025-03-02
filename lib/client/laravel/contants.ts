import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  sameSite: 'none',
  secure: true,
  domain: process.env.DOMAIN || 'localhost',
};
