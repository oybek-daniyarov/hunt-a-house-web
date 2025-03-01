/**
 * Sets the authentication token via the API route
 */
export async function setAuthToken(token: string): Promise<boolean> {
  try {
    // Use relative URL to avoid issues with different environments
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        credentials: 'include',
      }
    );

    console.log('Response:', response);

    return response.ok;
  } catch (error) {
    console.error('Error setting auth token:', error);
    return false;
  }
}
