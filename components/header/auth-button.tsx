'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';

export default function AuthButton() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={isAuthenticated ? '/dashboard' : '/auth/login'}>
        {isAuthenticated ? 'Dashboard' : 'Login'}
      </Link>
    </Button>
  );
}
