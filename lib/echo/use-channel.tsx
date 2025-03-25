import { useEffect } from 'react';

import { useEcho } from '@/lib/echo/echo-provider';

type ChannelType = 'public' | 'private';
type ChannelNames =
  | 'user-status'
  | 'presence-online-users'
  | `chat.${number | string}`
  | `chat.sender.${number | string}`;

interface EventPayloads {
  'chat.message.sent': App.Data.Chat.ChatMessageData;
  'chat.user.online.status.changed': {
    isOnline: boolean;
    user: App.Data.Chat.ChatUserData;
  };
  'chat.user.status.changed': {
    status: string;
    user: App.Data.Chat.ChatUserData;
  };
  'chat.user.typing': {
    user: App.Data.Chat.ChatUserData;
  };
  'chat.user.read': {
    message: App.Data.Chat.ChatMessageData;
    user: App.Data.Chat.ChatUserData;
  };
}

export const useChannel = <T extends keyof EventPayloads>(
  channelName: ChannelNames,
  event: T,
  callback: (data: EventPayloads[T]) => void,
  type: ChannelType = 'public',
  active?: boolean
) => {
  const { echo } = useEcho();

  useEffect(() => {
    if (!echo || !active) return;

    const channel =
      type === 'private'
        ? echo.private(channelName)
        : echo.channel(channelName);

    channel.listen(`.${event}`, callback);

    return () => {
      channel.stopListening(`.${event}`);
    };
  }, [echo, channelName, event, callback, type, active]);
};
