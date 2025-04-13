'use client';

import Link from 'next/link';
import { Coins, Loader2 } from 'lucide-react';
import { RiUserLine, RiUserSettingsLine } from 'react-icons/ri';

import { LogoutMenuItem } from '@/components/logout-menu-item';
import { useAuth } from '@/components/providers/auth-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth/login">
          <RiUserLine className="h-4 w-4 md:hidden" />
          <span className="hidden md:inline">Login</span>
        </Link>
      </Button>
    );
  }

  // If authenticated, show dropdown with credits badge for agents
  return (
    <div className="flex items-center gap-2">
      {isAgent && (
        <Badge
          variant="outline"
          className="flex items-center gap-1.5 py-1.5 px-2.5"
        >
          <Coins className="h-3.5 w-3.5 text-primary" />
          <span className="font-bold text-primary">{user?.credits || 0}</span>
        </Badge>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <RiUserSettingsLine className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <RiUserSettingsLine className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogoutMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
