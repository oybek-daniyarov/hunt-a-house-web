import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/client/laravel/auth';

export default async function Page() {
  const { user } = await getSession({ headers: await headers() });

  if (user?.userType === 'agent') {
    return redirect('/dashboard/agent/leads');
  }

  return redirect('/dashboard/user/leads');
}
