import { User } from '@/common/types/user.types';

import { Socket } from 'socket.io-client';

export interface AuthState {
  user: User | false | null;
  socket: Socket | null;
}

export const initialAuthState: AuthState = {
  user: false,
  socket: null,
};
