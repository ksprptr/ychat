import { LoginFormData, RegisterFormData } from '@/common/types/auth.types';
import { UserFormData } from '@/common/types/user.types';

import { AuthContext as AuthContextType } from './types/auth-context.types';
import { createContext, useContext } from 'react';

// Create context
export const AuthContext = createContext<AuthContextType>({
  user: false,
  socket: null,
  register: (_formData: RegisterFormData) => {},
  login: (_formData: LoginFormData) => {},
  logout: () => {},
  updateUser: (_formData: UserFormData) => {},
  deleteUser: () => {},
});

/**
 * Function representing a hook to use the AuthContext
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
