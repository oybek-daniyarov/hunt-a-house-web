import { headers } from 'next/headers';
import Link from 'next/link';
import { Coins, FileText, Lock, MessageSquare } from 'lucide-react';

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
      title: 'My Listings',
      url: '/dashboard/user/leads',
      icon: FileText,
      userTypes: ['user'],
    },
    {
      title: 'My Leads',
      url: '/dashboard/agent/leads',
      icon: FileText,
      userTypes: ['agent'],
    },
    {
      title: 'Buy Unlocks',
      url: '/dashboard/agent/unlocks',
      icon: Coins,
      userTypes: ['agent'],
    },
    {
      title: 'Unlocked Leads',
      url: '/dashboard/agent/unlocks/lead-unlocked',
      icon: Lock,
      userTypes: ['agent'],
    },
    {
      title: 'Chat',
      url: '/dashboard/chat',
      icon: MessageSquare,
      userTypes: ['user', 'agent'],
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
