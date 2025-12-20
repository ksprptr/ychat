import { Message, MessageReaction } from '@/common/types/message.types';

import { MessagesPayload } from '../types/conversation-context.types';
import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

/**
 * Function representing socket event handlers for conversation-related events
 */
export function registerConversationSocketHandlers(
  socket: Socket,
  setMessages: Dispatch<SetStateAction<MessagesPayload>>,
) {
  /**
   * Event handler for when a new message is created
   */
  socket.on('message.created', (message: Message) => {
    setMessages((prev) => {
      const conversationId = message.conversationId;

      return {
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), message],
      };
    });
  });

  /**
   * Event handler for when a message is updated
   */
  socket.on('message.updated', (message: Message) => {
    setMessages((prev) => {
      const conversationId = message.conversationId;

      return {
        ...prev,
        [conversationId]: prev[conversationId].map((m) => (m.id === message.id ? message : m)),
      };
    });
  });

  /**
   * Event handler for when a message is deleted
   */
  socket.on('message.deleted', (message: Message) => {
    setMessages((prev) => {
      const updated = { ...prev };

      for (const conversationId in updated) {
        updated[conversationId] = updated[conversationId].filter((m) => m.id !== message.id);
      }

      return updated;
    });
  });

  /**
   * Event handler for when a reaction is added to a message
   */
  socket.on('reaction.added', (reaction: MessageReaction) => {
    setMessages((prev) => {
      const updated = { ...prev };

      for (const conversationId in updated) {
        updated[conversationId] = updated[conversationId].map((m) =>
          m.id === reaction.messageId ? { ...m, reactions: [...m.reactions, reaction] } : m,
        );
      }

      return updated;
    });
  });

  /**
   * Event handler for when a reaction is removed from a message
   */
  socket.on('reaction.removed', (reaction: MessageReaction) => {
    setMessages((prev) => {
      const updated = { ...prev };

      for (const conversationId in updated) {
        updated[conversationId] = updated[conversationId].map((m) =>
          m.id === reaction.messageId
            ? {
                ...m,
                reactions: m.reactions.filter((r) => r.id !== reaction.id),
              }
            : m,
        );
      }

      return updated;
    });
  });
}
