import Link from 'next/link';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils';

const UserItem = ({
  chatUser,
  isActive,
}: {
  chatUser: App.Data.Chat.ChatUserData;
  isActive: boolean;
}) => {
  return (
    <Link
      href={`/dashboard/chat?id=${chatUser.id}`}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-accent/50 dark:hover:bg-accent/20 ${
        isActive
          ? 'bg-primary/10 dark:bg-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20'
          : ''
      }`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary relative">
        <User size={18} />
      </div>
      <div className="flex flex-1 flex-col text-start relative">
        <span className="font-medium text-sm">{chatUser.name}</span>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              chatUser.isOnline ? 'bg-green-500' : 'bg-red-500'
            )}
          ></span>
          <span className="text-xs text-muted-foreground">
            {chatUser.isOnline ? 'Online' : 'Offline'}
          </span>
          {chatUser.unreadCount && chatUser.unreadCount > 0 ? (
            <span className="absolute end-0 top-0 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-green-500 px-1.5">
              <span className="text-[11px] text-white font-medium">
                {chatUser.unreadCount}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
