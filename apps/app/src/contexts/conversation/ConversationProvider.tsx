import { handleAxiosError } from '@/common/handlers/axios-error.handler';
import { MessageFormData, MessageReactionFormData } from '@/common/types/message.types';
import { getAxiosErrorMessage } from '@/configs/app.config';

import { useAuth } from '../auth/AuthContext';
import { ConversationContext } from './ConversationContext';
import { conversationApi } from './parts/conversation.api';
import { registerConversationSocketHandlers } from './parts/conversation.socket';
import { initialConversationState } from './parts/conversation.state';
import { useSnackbar } from 'notistack';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Function representing a conversation provider
 */
export function ConversationProvider({ children }: PropsWithChildren) {
  const { user, socket } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [conversations, setConversations] = useState(initialConversationState.conversations);
  const [messages, setMessages] = useState(initialConversationState.messages);

  /**
   * Function to load all conversations
   */
  const loadConversations = useCallback(async () => {
    try {
      const response = await conversationApi.getConversations();
      setConversations(response.data.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to fetch conversations.', { variant: 'error' });
    }
  }, []);

  /**
   * Function to load messages for a specific conversation
   */
  const getMessages = useCallback(async (conversationId: string) => {
    try {
      const response = await conversationApi.getMessages(conversationId);

      setMessages((prev) => ({
        ...prev,
        [conversationId]: response.data.data,
      }));
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to fetch messages.', { variant: 'error' });
    }
  }, []);

  /**
   * Function to create a new message
   */
  const createMessage = useCallback(async (conversationId: string, data: MessageFormData) => {
    try {
      await conversationApi.createMessage(conversationId, data);
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'createMessage',
        statusHandlers: {
          400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
          401: () =>
            enqueueSnackbar('You are not authorized to perform this action.', { variant: 'error' }),
          404: () => enqueueSnackbar('Conversation not found.', { variant: 'error' }),
          409: () =>
            enqueueSnackbar('You cannot send a message to this user.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Function to update a message
   */
  const updateMessage = useCallback(
    async (conversationId: string, messageId: string, data: MessageFormData) => {
      try {
        await conversationApi.updateMessage(conversationId, messageId, data);
      } catch (error) {
        handleAxiosError({
          error,
          enqueueSnackbar,
          context: 'updateMessage',
          statusHandlers: {
            400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
            401: () =>
              enqueueSnackbar('You are not authorized to perform this action.', {
                variant: 'error',
              }),
            404: () => enqueueSnackbar('Message not found.', { variant: 'error' }),
            409: () => enqueueSnackbar('You cannot edit this message.', { variant: 'error' }),
          },
        });
      }
    },
    [],
  );

  /**
   * Function to delete a message
   */
  const deleteMessage = useCallback(async (conversationId: string, messageId: string) => {
    try {
      await conversationApi.deleteMessage(conversationId, messageId);
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'deleteMessage',
        statusHandlers: {
          400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
          401: () =>
            enqueueSnackbar('You are not authorized to perform this action.', { variant: 'error' }),
          404: () => enqueueSnackbar('Message not found.', { variant: 'error' }),
          409: () => enqueueSnackbar('You cannot delete this message.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Function to toggle a reaction on a message
   */
  const toggleReaction = useCallback(
    async (conversationId: string, messageId: string, data: MessageReactionFormData) => {
      try {
        await conversationApi.toggleReaction(conversationId, messageId, data);
      } catch (error) {
        handleAxiosError({
          error,
          enqueueSnackbar,
          context: 'toggleReaction',
          statusHandlers: {
            400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
            401: () =>
              enqueueSnackbar('You are not authorized to perform this action.', {
                variant: 'error',
              }),
            404: () => enqueueSnackbar('Message not found.', { variant: 'error' }),
            409: () => enqueueSnackbar('You cannot react to this message.', { variant: 'error' }),
          },
        });
      }
    },
    [],
  );

  /**
   * Effect to load conversations when user changes
   */
  useEffect(() => {
    if (!user) return;
    loadConversations();
  }, [user, loadConversations]);

  /**
   * Effect to register socket handlers
   */
  useEffect(() => {
    if (!socket) return;

    registerConversationSocketHandlers(socket, setMessages);

    return () => {
      socket.off('message.created');
      socket.off('message.updated');
      socket.off('message.deleted');
      socket.off('reaction.added');
      socket.off('reaction.removed');
    };
  }, [socket]);

  /**
   * Memoized conversation context value
   */
  const value = useMemo(
    () => ({
      conversations,
      messages,
      getMessages,
      createMessage,
      updateMessage,
      deleteMessage,
      toggleReaction,
    }),
    [
      conversations,
      messages,
      getMessages,
      createMessage,
      updateMessage,
      deleteMessage,
      toggleReaction,
    ],
  );

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}
