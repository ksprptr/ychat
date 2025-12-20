import http from '@/common/services/axios/axios.instance';
import { Conversation } from '@/common/types/conversation.types';
import { Message, MessageFormData, MessageReactionFormData } from '@/common/types/message.types';
import { PaginationResponse } from '@/common/types/pagination.types';

/**
 * Object representing api calls related to conversations and messages
 */
export const conversationApi = {
  getConversations: () => http.get<PaginationResponse<Conversation>>('/conversations'),

  getMessages: (conversationId: string) =>
    http.get<PaginationResponse<Message>>(
      `/conversations/${conversationId}/messages?sortField=createdAt&sortOrder=desc`,
    ),

  createMessage: (conversationId: string, data: MessageFormData) =>
    http.post(`/conversations/${conversationId}/messages`, data),

  updateMessage: (conversationId: string, messageId: string, data: MessageFormData) =>
    http.patch(`/conversations/${conversationId}/messages/${messageId}`, data),

  deleteMessage: (conversationId: string, messageId: string) =>
    http.delete(`/conversations/${conversationId}/messages/${messageId}`),

  toggleReaction: (conversationId: string, messageId: string, data: MessageReactionFormData) =>
    http.post(`/conversations/${conversationId}/messages/${messageId}/reaction`, data),
};
