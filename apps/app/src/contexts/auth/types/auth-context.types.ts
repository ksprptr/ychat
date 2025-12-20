import { LoginFormData, RegisterFormData } from '@/common/types/auth.types';
import { User, UserFormData } from '@/common/types/user.types';

import { Socket } from 'socket.io-client';

export interface AuthContext {
  user: User | false | null;
  socket: Socket | null;
  register: (formData: RegisterFormData) => void;
  login: (formData: LoginFormData) => void;
  logout: () => void;
  updateUser: (formData: UserFormData) => void;
  deleteUser: () => void;
}
