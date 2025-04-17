'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Server action to revalidate the auth tag
 * This ensures that user data (including credits) is refreshed
 */
export async function revalidateAuthTag() {
  try {
    revalidateTag('auth');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Error revalidating auth tag:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to revalidate auth tag',
    };
  }
}
