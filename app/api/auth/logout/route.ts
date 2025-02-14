import { logoutAction } from '@/lib/data/laravel/auth/auth.actions';

export async function POST() {
  try {
    const result = await logoutAction();

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: {
            message: result.error?.message || 'Logout failed',
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
    console.error('Logout error:', error);
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
