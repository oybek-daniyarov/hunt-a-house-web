'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, User } from 'lucide-react';

import { useChat } from '@/app/dashboard/chat/_components/chat-context';
import UserItem from '@/app/dashboard/chat/_components/user-item';
import { useDebounce } from '@/hooks/use-debounce';

const ChatUserList = () => {
  const { leads, selectedLead } = useChat();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 300);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  // Update URL when debounced value changes
  useEffect(() => {
    if (debouncedValue !== query) {
      router.push(`?${createQueryString('q', debouncedValue)}`, {
        scroll: false,
      });
    }
  }, [debouncedValue, createQueryString, query, router]);

  const handleSearch = (term: string) => {
    setInputValue(term);
  };

  const filteredUsers = query
    ? leads?.filter(
        (lead) =>
          lead.user?.name?.toLowerCase().includes(query.toLowerCase()) ||
          lead.user?.email?.toLowerCase().includes(query.toLowerCase())
      )
    : leads;

  return (
    <div className="flex flex-col border-e border-border bg-card/50 dark:bg-card/30">
      <div className="bg-muted/40 dark:bg-card/50 backdrop-blur-sm px-4 py-3 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">Messages</h2>
          <div className="flex h-5 items-center rounded-full bg-primary/10 dark:bg-primary/20 px-3 text-xs font-medium text-primary dark:text-primary-foreground">
            {leads?.length} Online
          </div>
        </div>

        {/* Search input */}
        <div className="relative mt-4">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full rounded-full bg-accent py-1.5 ps-7 pe-3 text-xs outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder="Search contacts..."
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        {filteredUsers?.length && filteredUsers.length > 0 ? (
          <div className="space-y-1 p-3">
            {filteredUsers.map((lead) => (
              <UserItem
                key={lead.id}
                lead={lead}
                isActive={selectedLead?.id === lead.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted dark:bg-muted/30 text-muted-foreground">
              <User size={20} />
            </div>
            <p className="text-muted-foreground text-sm">
              {query ? 'No matching contacts found' : 'No users online'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUserList;
