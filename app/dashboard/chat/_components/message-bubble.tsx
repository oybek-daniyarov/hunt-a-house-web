import Image from 'next/image';
import { Download, FileText } from 'lucide-react';

import { formatDate } from '@/lib/utils/format-date';

const MessageBubble = ({
  message,
  isCurrentUser,
}: {
  message: App.Data.Chat.ChatMessageData;
  isCurrentUser: boolean;
}) => {
  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <div
      className={`mb-2.5 w-full ${isCurrentUser ? 'ms-auto flex flex-col items-end' : 'flex flex-col items-start'}`}
    >
      <div
        className={`inline-block max-w-[90%] rounded-2xl px-2 py-2.5 ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted dark:bg-muted/30'
        }`}
      >
        {message.message && (
          <p className="break-words text-sm">{message.message}</p>
        )}

        {hasAttachments && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.attachments?.map((attachment, index) => {
              const isImage = attachment.mimTeype?.startsWith('image/');
              const isVideo = attachment.mimTeype?.startsWith('video/');
              const isPdf = attachment.mimTeype === 'application/pdf';

              return (
                <div key={index} className="relative flex items-center gap-2">
                  {isImage ? (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative size-20 ring-1 ring-border rounded-md"
                    >
                      <Image
                        src={attachment.url}
                        alt={attachment.name || 'Attachment'}
                        className="rounded-md object-cover object-center"
                        fill
                      />
                    </a>
                  ) : isVideo ? (
                    <video
                      src={attachment.url}
                      controls
                      className="max-h-32 max-w-40 rounded-md ring-1 ring-border"
                    />
                  ) : (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2 rounded-md ring-1 ring-border ${
                        isCurrentUser
                          ? 'bg-primary-foreground/10 text-primary-foreground'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {isPdf ? (
                        <FileText
                          size={16}
                          className={
                            isCurrentUser
                              ? 'text-primary-foreground'
                              : 'text-primary'
                          }
                        />
                      ) : (
                        <Download
                          size={16}
                          className={
                            isCurrentUser
                              ? 'text-primary-foreground'
                              : 'text-primary'
                          }
                        />
                      )}
                      <span className="text-xs truncate max-w-32">
                        {attachment.name || 'Download file'}
                      </span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-0.5 text-[10px] text-muted-foreground">
        {message.createdAt ? formatDate(message.createdAt, true) : ''}
      </div>
    </div>
  );
};

export default MessageBubble;
