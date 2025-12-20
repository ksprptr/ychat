import { getEnvUrl } from '@/configs/app.config';

import { io, Socket } from 'socket.io-client';

/**
 * Function to create and configure a Socket.IO client for conversations
 */
export const createConversationsSocket = (): Socket => {
  return io(getEnvUrl('ws'), {
    withCredentials: true,
    transports: ['websocket'],
    autoConnect: false,
  });
};
