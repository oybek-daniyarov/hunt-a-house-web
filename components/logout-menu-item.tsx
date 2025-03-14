'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { useAuth } from '@/components/providers/auth-provider';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { handleFormSuccess } from '@/lib/client/laravel/helpers/form.helpers';

export function LogoutMenuItem() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      handleFormSuccess('You have been logged out successfully');
      router.push('/auth/login');
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
