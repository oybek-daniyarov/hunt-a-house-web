import { redirect } from 'next/navigation';

import ChatArea from '@/app/dashboard/chat/_components/chat-area';
import ChatUserList from '@/app/dashboard/chat/_components/chat-user-list';
import { getLeads, getMessages } from '@/lib/data/laravel/chat/chat.api';
import { ChatProvider } from './_components/chat-context';

type ChatPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ChatPage = async (params: ChatPageProps) => {
  const searchParams = await params.searchParams;
  const id = searchParams.id;

  const leads = await getLeads();
  const activeLead = id ? leads.find((lead) => lead.id === id) : null;

  if (leads.length > 0 && (!id || !activeLead)) {
    return redirect(`/dashboard/chat?id=${leads[0].id}`);
  }

  const messages = id ? await getMessages(String(id)) : null;

  return (
    <div className="rounded-xl h-full overflow-hidden border border-border shadow-sm dark:shadow-lg dark:shadow-primary/5">
      <ChatProvider
        leads={leads}
        selectedLead={activeLead}
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
