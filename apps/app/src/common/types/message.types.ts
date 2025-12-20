import { messageReactionSchema, messageSchema } from '../validations/message.validations';
import { User } from './user.types';
import z from 'zod';

export interface Message {
  id: string;
  content: string;
  sender: User;
  reactions: MessageReaction[];
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  emoji: string;
  user: User;
  createdAt: string;
}

export type MessageFormData = z.infer<typeof messageSchema>;

export type MessageReactionFormData = z.infer<typeof messageReactionSchema>;
