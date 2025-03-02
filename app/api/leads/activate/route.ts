import { NextRequest, NextResponse } from 'next/server';

import { setToken } from '@/lib/client/laravel/cookies';
import { activateLead } from '@/lib/data/laravel/lead/lead.api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const leadId = searchParams.get('lead');
  const email = searchParams.get('email');

  if (!leadId || !email || !token) {
    return NextResponse.json({
      success: false,
      message: 'Missing required parameters',
    });
  }

  const response = await activateLead({
    lead: Number(leadId),
    email,
    token,
  });

  if (!response.success) {
    return NextResponse.redirect(
      new URL('/lead/error?message=' + response.error?.message, request.url)
    );
  }

  await setToken({ token: response.data?.token || '' });

  return NextResponse.redirect(new URL('/dashboard/user/leads', request.url));
}
