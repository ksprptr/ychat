import { MessageFormData, MessageReactionFormData } from '@/common/types/message.types';

import { ConversationContext as ConversationContextType } from './types/conversation-context.types';
import { createContext, useContext } from 'react';

// Create context
export const ConversationContext = createContext<ConversationContextType>({
  conversations: [],
  messages: {},
  getMessages: (_conversationId: string) => {},
  createMessage: (_conversationId: string, _formData: MessageFormData) => {},
  updateMessage: (_conversationId: string, _messageId: string, _formData: MessageFormData) => {},
  deleteMessage: (_conversationId: string, _messageId: string) => {},
  toggleReaction: (
    _conversationId: string,
    _messageId: string,
    _formData: MessageReactionFormData,
  ) => {},
});

/**
 * Function representing a hook to use the ConversationContext
 */
export function useConversation() {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }

  return context;
}
