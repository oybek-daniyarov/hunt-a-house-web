import { headers } from 'next/headers';
import Link from 'next/link';
import { CreditCard, FileText, Home, Users } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getSession } from '@/lib/client/laravel/auth';

type NavItem = {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  userTypes?: App.Enums.UserType[];
};

export async function NavMain() {
  const { user } = await getSession({
    headers: await headers(),
  });

  const items: NavItem[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'My Leads',
      url: '/dashboard/user/leads',
      icon: FileText,
      userTypes: ['user'],
    },
    {
      title: 'Lead Management',
      url: '/dashboard/leads',
      icon: FileText,
      userTypes: ['agent'],
    },
    {
      title: 'Buy Tokens',
      url: '/dashboard/products',
      icon: CreditCard,
      userTypes: ['agent'],
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: Users,
      userTypes: ['admin'],
    },
  ];

  // Filter items based on user type
  const filteredItems = items.filter(
    (item) =>
      !item.userTypes ||
      item.userTypes.includes(user?.userType as App.Enums.UserType)
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
