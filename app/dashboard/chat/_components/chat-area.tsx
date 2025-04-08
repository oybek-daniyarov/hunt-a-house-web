'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Send,
  User,
  Video,
  X,
} from 'lucide-react';

import { useChat } from '@/app/dashboard/chat/_components/chat-context';
import MessageBubble from '@/app/dashboard/chat/_components/message-bubble';
import { ChatMessageList } from '@/components/chat/chat-message-list';
import { useAuth } from '@/components/providers/auth-provider';
import { cn } from '@/lib/utils';

const FilePreview = ({
  file,
  index,
  onRemove,
}: {
  file: { file: File; type: string; preview: string };
  index: number;
  onRemove: (index: number) => void;
}) => {
  return (
    <div className="relative h-16 w-16 rounded-md overflow-hidden border border-border group">
      {file.type === 'image' ? (
        <Image
          src={file.preview}
          alt={file.file.name}
          className="h-full w-full object-cover"
          width={64}
          height={64}
        />
      ) : file.type === 'video' ? (
        <div className="h-full w-full bg-muted flex items-center justify-center">
          <Video className="h-6 w-6 text-muted-foreground" />
        </div>
      ) : (
        <div className="h-full w-full bg-muted flex items-center justify-center">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <button
        onClick={() => onRemove(index)}
        className="absolute top-0.5 right-0.5 h-5 w-5 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-3 w-3" />
      </button>
      {file.type === 'document' && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/80 text-[8px] truncate px-1 py-0.5">
          {file.file.name}
        </div>
      )}
    </div>
  );
};

const ChatArea = () => {
  const {
    selectedLead,
    messages,
    message,
    setMessage,
    files,
    addFiles,
    removeFile,
    sendMessageHandler,
  } = useChat();

  const { user } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  return (
    <div className="col-span-2 flex flex-col bg-background">
      <div className="flex flex-col w-full h-full">
        {!selectedLead ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted dark:bg-muted/30">
              <MessageCircle size={30} className="text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Your messages</h3>
            <p className="text-muted-foreground text-sm">
              Select a contact to start chatting
            </p>
          </div>
        ) : (
          <>
            <div className="border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center">
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <User size={18} />
                </div>
                <div className="ms-3">
                  <h3 className="font-medium text-sm">
                    {selectedLead?.lead?.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        selectedLead.user?.isOnline
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      )}
                    ></span>
                    <span className="text-xs text-muted-foreground">
                      {selectedLead.user?.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 h-auto overflow-y-auto relative">
              {messages.length > 0 ? (
                <ChatMessageList className="absolute inset-0 w-full h-full">
                  {messages.map((msg, index) => (
                    <MessageBubble
                      key={msg.id || `msg-${index}`}
                      message={msg}
                      isCurrentUser={user?.id === msg.recipientId}
                    />
                  ))}
                </ChatMessageList>
              ) : (
                <div className="flex h-full flex-col items-center justify-center py-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted dark:bg-muted/30 text-muted-foreground">
                    <Send size={22} />
                  </div>
                  <p className="text-center text-muted-foreground text-sm">
                    No messages yet. Say hello!
                  </p>
                </div>
              )}
            </div>

            {/* Message Input - Made sticky and taller */}
            <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3 flex flex-col">
              {/* File Previews */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      file={file}
                      index={index}
                      onRemove={removeFile}
                    />
                  ))}
                </div>
              )}

              {/* Hidden file inputs */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => addFiles(e.target.files, 'image')}
                className="hidden"
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => addFiles(e.target.files, 'video')}
                className="hidden"
              />
              <input
                ref={documentInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                multiple
                onChange={(e) => addFiles(e.target.files, 'document')}
                className="hidden"
              />

              <div className="flex items-center gap-3 rounded-full bg-muted dark:bg-muted/30 pe-2 ps-5 h-12 w-full">
                <div className="flex items-center gap-1.5">
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background/80 transition-colors"
                    aria-label="Attach image"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon size={16} className="text-muted-foreground" />
                  </button>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background/80 transition-colors"
                    aria-label="Attach video"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Video size={16} className="text-muted-foreground" />
                  </button>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background/80 transition-colors"
                    aria-label="Attach file"
                    onClick={() => documentInputRef.current?.click()}
                  >
                    <FileText size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="h-6 w-px bg-border/50 ms-1.5"></div>
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent outline-none py-3 text-sm ms-2"
                  placeholder={`Message ${selectedLead.lead?.name}...`}
                />
                <button
                  onClick={sendMessageHandler}
                  disabled={!message.trim() && files.length === 0}
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
