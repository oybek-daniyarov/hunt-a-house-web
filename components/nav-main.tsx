import { Building2, FileText, Home, Users } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getCurrentUser } from '@/lib/data/laravel/auth/auth.api';

type NavItem = {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  userTypes?: App.Enums.UserType[];
};

export async function NavMain() {
  const { data: user } = await getCurrentUser();

  const items: NavItem[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'My Leads',
      url: '/dashboard/my-leads',
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
      title: 'Properties',
      url: '/dashboard/properties',
      icon: Building2,
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
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
