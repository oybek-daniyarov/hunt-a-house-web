import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_OPTIONS } from '@/lib/client/laravel/contants';
import { env } from '@/lib/env';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    response.cookies.set(env.AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Error setting token:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to set token' },
      { status: 500 }
    );
  }
}
