import { Conversation } from '@/common/types/conversation.types';

import { MessagesPayload } from '../types/conversation-context.types';

export interface ConversationState {
  conversations: Conversation[];
  messages: MessagesPayload;
}

export const initialConversationState: ConversationState = {
  conversations: [],
  messages: {},
};
