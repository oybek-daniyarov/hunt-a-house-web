'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuth } from '@/components/providers/auth-provider';
import { revalidateTagsAsync } from '@/lib/client/laravel';
import { sendMessage } from '@/lib/data/laravel/chat/chat.api';
import { useChannel } from '@/lib/echo/use-channel';

type FileType = 'image' | 'video' | 'document';

type ChatFile = {
  file: File;
  type: FileType;
  preview: string;
};

type ChatContextType = {
  selectedLead: App.Data.Chat.ChatData | null;
  leads?: App.Data.Chat.ChatData[];
  messages: App.Data.Chat.ChatMessageData[];
  message: string;
  setMessage: (message: string) => void;
  files: ChatFile[];
  addFiles: (newFiles: FileList | null, type: FileType) => void;
  removeFile: (index: number) => void;
  sendMessageHandler: () => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({
  children,
  selectedLead = null,
  initialMessages = [],
  leads,
}: {
  children: ReactNode;
  leads: App.Data.Chat.ChatData[];
  selectedLead?: App.Data.Chat.ChatData | null;
  initialMessages?: App.Data.Chat.ChatMessageData[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [messages, setMessages] =
    useState<App.Data.Chat.ChatMessageData[]>(initialMessages);
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<ChatFile[]>([]);

  const addMessageToConversation = async (
    newMessage: App.Data.Chat.ChatMessageData
  ) => {
    setMessages((prev) => {
      if (prev.some((msg) => msg.id === newMessage.id)) return prev;

      // Remove any temporary messages that match this confirmed message
      const withoutTempMessages = prev.filter(
        (msg) => !msg.id?.toString().startsWith('temp-')
      );

      return [...withoutTempMessages, newMessage];
    });
  };

  // Chat channel subscriptions
  useChannel(
    `chat.lead.${selectedLead?.id}`,
    'chat.message.sent',
    async (data) => {
      addMessageToConversation(data);
    },
    'private',
    user?.id ? true : false
  );

  useChannel(
    `user-status`,
    'chat.user.status.changed',
    async () => {
      await revalidateTagsAsync('chat');
    },
    'public',
    user?.id ? true : false
  );

  // File handling functions
  const addFiles = useCallback((newFiles: FileList | null, type: FileType) => {
    if (!newFiles || newFiles.length === 0) return;

    const filesToAdd: ChatFile[] = [];

    Array.from(newFiles).forEach((file) => {
      // Create preview URLs for images and videos
      let preview = '';
      if (type === 'image' || type === 'video') {
        preview = URL.createObjectURL(file);
      }

      filesToAdd.push({
        file,
        type,
        preview,
      });
    });

    setFiles((prev) => [...prev, ...filesToAdd]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      // Revoke object URL to prevent memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  // Send a message
  const sendMessageHandler = useCallback(async () => {
    if (!message.trim() && files.length === 0) return;

    try {
      const trimmedMessage = message.trim();

      // Prepare file attachments
      const attachments = files.map((fileObj) => ({
        file: fileObj.file,
      }));

      setMessage('');
      setFiles([]);

      // Send to server
      selectedLead?.id &&
        (await sendMessage(
          {
            message: trimmedMessage || null,
            attachments: attachments.length > 0 ? attachments : null,
          },
          selectedLead?.id
        ));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [message, files, selectedLead]);

  // Update URL when active user changes
  useEffect(() => {
    if (selectedLead?.id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('id', selectedLead.id);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedLead?.id, router, searchParams]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, selectedLead?.user?.id]);

  const value = useMemo(
    () => ({
      selectedLead,
      messages,
      message,
      leads,
      setMessage,
      files,
      addFiles,
      removeFile,
      sendMessageHandler,
    }),
    [
      selectedLead,
      messages,
      message,
      leads,
      files,
      addFiles,
      removeFile,
      sendMessageHandler,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
