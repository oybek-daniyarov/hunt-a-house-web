import { getCurrentUser } from '@/lib/data/laravel/auth/auth.api';

export async function GET() {
  try {
    const result = await getCurrentUser();

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: {
            message: result.error?.message || 'Failed to get user',
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
    console.error('Get user error:', error);
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
