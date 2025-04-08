import Link from 'next/link';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils';

interface UserItemProps {
  lead: App.Data.Chat.ChatData;
  isActive: boolean;
}

const UserItem = ({ lead, isActive }: UserItemProps) => {
  return (
    <Link
      href={`/dashboard/chat?id=${lead.id}`}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-accent/50 dark:hover:bg-accent/20',
        isActive &&
          'bg-primary/10 dark:bg-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20'
      )}
    >
      <div className="relative">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
          <User size={18} />
        </div>
        <span
          className={cn(
            'absolute -top-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-background',
            lead?.user?.isOnline ? 'bg-green-500' : 'bg-red-500'
          )}
        />
      </div>

      <div className="flex flex-1 flex-col text-start relative overflow-hidden">
        <span className="font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {lead.lead?.name}
        </span>
        <span className="text-xs text-muted-foreground">View lead</span>
        {lead?.user?.unreadCount && lead?.user?.unreadCount > 0 && (
          <span className="absolute end-0 top-0 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-green-500 px-1.5">
            <span className="text-[11px] text-white font-medium">
              {lead?.user?.unreadCount}
            </span>
          </span>
        )}
      </div>
    </Link>
  );
};

export default UserItem;
