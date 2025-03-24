import ChatArea from '@/app/dashboard/chat/_components/chat-area';
import ChatUserList from '@/app/dashboard/chat/_components/chat-user-list';
import { getMessages, getUsers } from '@/lib/data/laravel/chat/chat.api';
import { ChatProvider } from './_components/chat-context';

type ChatPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ChatPage = async (params: ChatPageProps) => {
  const searchParams = await params.searchParams;
  const id = Number(searchParams.id);
  const users = await getUsers();
  const messages = id ? await getMessages(id) : null;
  const activeUser = id ? users.find((user) => user.id === id) : null;

  console.log('users', users);

  return (
    <div className="rounded-xl h-full overflow-hidden border border-border shadow-sm dark:shadow-lg dark:shadow-primary/5">
      <ChatProvider
        users={users}
        selectedUser={activeUser}
        initialMessages={messages || []}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-3">
          <ChatUserList />
          <ChatArea />
        </div>
      </ChatProvider>
    </div>
  );
};

export default ChatPage;
