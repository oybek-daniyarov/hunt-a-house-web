import { NextRequest } from 'next/server';

import { loginAction } from '@/lib/data/laravel/auth/auth.actions';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await loginAction(data);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: {
            message: result.error?.message || 'Login failed',
            errors: result.error?.errors,
          },
        },
        { status: 422 }
      );
    }

    return Response.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      {
        success: false,
        error: {
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}
