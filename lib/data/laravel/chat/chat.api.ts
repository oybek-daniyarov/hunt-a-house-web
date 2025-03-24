import { get, post, postFormData } from '@/lib/client/laravel';
import { createUrl, routes } from '@/types/api-routes';

const CHAT_TAGS = ['chat'];

export const sendMessage = async (
  payload: App.Data.Chat.Payload.SendMessagePayloadData,
  userId: number
) => {
  // If there are files, use FormData approach
  if (payload.attachments && payload.attachments.length > 0) {
    const formData = new FormData();

    if (payload.message) {
      formData.append('message', payload.message);
    }

    // Add each file to the FormData
    payload.attachments.forEach((attachment, index) => {
      if (attachment.file) {
        formData.append(`attachments[${index}]`, attachment.file);
      }
    });

    const response = await postFormData<App.Data.Chat.ChatMessageData>(
      createUrl(routes['chat.send'], { recipient: userId }),
      formData,
      CHAT_TAGS
    );
    return response;
  }

  // Otherwise use regular JSON approach
  const response = await post<App.Data.Chat.ChatMessageData>(
    createUrl(routes['chat.send'], { recipient: userId.toString() }),
    payload,
    CHAT_TAGS
  );
  return response;
};

export const getMessages = async (recipient: number) =>
  get<App.Data.Chat.ChatMessageData[]>(
    createUrl(routes['chat.messages'], { userId: recipient.toString() }),
    CHAT_TAGS
  );

export const getUsers = async () => {
  const response = await get<App.Data.Chat.ChatUserData[]>(
    createUrl(routes['chat.users']),
    CHAT_TAGS
  );
  return response;
};
