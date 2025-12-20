import { Conversation } from '@/common/types/conversation.types';
import { Message, MessageFormData, MessageReactionFormData } from '@/common/types/message.types';

export interface ConversationContext {
  conversations: Conversation[];
  messages: MessagesPayload;
  getMessages: (conversationId: string) => void;
  createMessage: (conversationId: string, formData: MessageFormData) => void;
  updateMessage: (conversationId: string, messageId: string, formData: MessageFormData) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  toggleReaction: (
    conversationId: string,
    messageId: string,
    formData: MessageReactionFormData,
  ) => void;
}

export interface MessagesPayload {
  [conversationId: string]: Message[];
}
