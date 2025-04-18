import * as React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Command } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getSession } from '@/lib/client/laravel/auth';
import { AvailableUnlocks } from './available-unlocks';

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export async function AppSidebar(props: AppSidebarProps) {
  const { user } = await getSession({
    headers: await headers(),
  });

  const isAgent = user?.userType === 'agent';

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Hunt A House</span>
                  <span className="truncate text-xs">Back to Website</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isAgent && <AvailableUnlocks credits={user.credits || 0} />}
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
