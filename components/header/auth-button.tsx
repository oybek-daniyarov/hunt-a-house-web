'use client';

import Link from 'next/link';
import { Coins, Loader2 } from 'lucide-react';
import { RiUserLine, RiUserSettingsLine } from 'react-icons/ri';

import { useAuth } from '@/components/providers/auth-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AuthButton() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const isAgent = user?.userType === 'agent';

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </Button>
    );
  }

  // If user is an agent, show unlocks badge
  if (isAuthenticated && isAgent) {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="flex items-center gap-1.5 py-1.5 px-2.5"
        >
          <Coins className="h-3.5 w-3.5 text-primary" />
          <span className="font-bold text-primary">{user?.credits || 0}</span>
        </Badge>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <RiUserSettingsLine className="h-4 w-4 md:hidden" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        </Button>
      </div>
    );
  }

  // Default button for non-agents or not authenticated
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={isAuthenticated ? '/dashboard' : '/auth/login'}>
        {isAuthenticated ? (
          <>
            <RiUserSettingsLine className="h-4 w-4 md:hidden" />
            <span className="hidden md:inline">Dashboard</span>
          </>
        ) : (
          <>
            <RiUserLine className="h-4 w-4 md:hidden" />
            <span className="hidden md:inline">Login</span>
          </>
        )}
      </Link>
    </Button>
  );
}
