'use server';

import { get, post, postFormData } from '@/lib/client/laravel';
import { createUrl, routes } from '@/types/api-routes';

const CHAT_TAGS = ['chat'];

export const sendMessage = async (
  payload: App.Data.Chat.Payload.SendMessagePayloadData,
  leadId: string
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
      createUrl(routes['chat.send'], { leadId }),
      formData,
      CHAT_TAGS
    );
    return response;
  }

  // Otherwise use regular JSON approach
  const response = await post<App.Data.Chat.ChatMessageData>(
    createUrl(routes['chat.send'], { leadId }),
    payload,
    CHAT_TAGS
  );
  return response;
};

export const getMessages = async (leadId: string) =>
  get<App.Data.Chat.ChatMessageData[]>(
    createUrl(routes['chat.messages'], { leadId })
  );

export const getLeads = async () => {
  const response = await get<App.Data.Chat.ChatData[]>(
    createUrl(routes['chat.leads']),
    CHAT_TAGS
  );
  return response;
};
