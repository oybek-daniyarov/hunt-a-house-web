'use client';

import Link from 'next/link';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';

export default function AuthButton() {
  const { isAuthenticated } = useAuth();

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={isAuthenticated ? '/dashboard' : '/auth/login'}>
        {isAuthenticated ? 'Dashboard' : 'Login'}
      </Link>
    </Button>
  );
}
