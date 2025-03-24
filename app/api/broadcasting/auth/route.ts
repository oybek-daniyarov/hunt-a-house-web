import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { getToken } from '@/lib/client/laravel/cookies';

export async function POST(request: NextRequest) {
  try {
    // Get the auth token using your existing function
    const authToken = await getToken();

    // If no auth token, user is not authenticated
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the socket ID and channel name from the request
    const formData = await request.formData();
    const socketId = formData.get('socket_id') as string;
    const channel = formData.get('channel_name') as string;

    // Extract user ID from the channel name for private channels
    let userId: string | null = null;
    if (channel.startsWith('private-chat.')) {
      userId = channel.split('.')[1];
    }

    // Generate the auth signature
    const appKey = process.env.NEXT_PUBLIC_REVERB_APP_KEY || '';
    const appSecret = process.env.REVERB_APP_SECRET || '';

    // Check if this is a presence channel
    const isPresenceChannel = channel.startsWith('presence-');

    // For presence channels, we need to include user data
    if (isPresenceChannel) {
      // Mock user data - in a real app, you would get this from your auth system
      // This should match the structure expected by your Laravel app
      const userData = {
        user_id: '11', // Use actual user ID from your auth system
        user_info: {
          name: 'Test User', // Use actual user name from your auth system
        },
      };

      // Create the string to sign: socket_id:channel_name:user_data
      const userDataString = JSON.stringify(userData);
      const stringToSign = `${socketId}:${channel}:${userDataString}`;

      // Create HMAC
      const hmac = crypto.createHmac('sha256', appSecret);
      hmac.update(stringToSign);
      const signature = hmac.digest('hex');

      // Return the auth response with channel_data for presence channels
      return NextResponse.json({
        auth: `${appKey}:${signature}`,
        channel_data: userDataString,
      });
    } else {
      // For private channels, just sign socket_id:channel_name
      const stringToSign = `${socketId}:${channel}`;

      // Create HMAC
      const hmac = crypto.createHmac('sha256', appSecret);
      hmac.update(stringToSign);
      const signature = hmac.digest('hex');

      // Return the auth response
      return NextResponse.json({
        auth: `${appKey}:${signature}`,
      });
    }
  } catch (error) {
    console.error('Broadcasting auth error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
