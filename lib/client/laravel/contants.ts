import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
};
