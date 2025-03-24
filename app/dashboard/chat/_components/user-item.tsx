import Link from 'next/link';
import { User } from 'lucide-react';

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
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
        <User size={18} />
      </div>
      <div className="flex flex-1 flex-col text-start">
        <span className="font-medium text-sm">{chatUser.name}</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
