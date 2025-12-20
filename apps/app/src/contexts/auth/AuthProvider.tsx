import { handleAxiosError } from '@/common/handlers/axios-error.handler';
import { createConversationsSocket } from '@/common/services/socket/messages.socket';
import { LoginFormData, RegisterFormData } from '@/common/types/auth.types';
import { UserFormData } from '@/common/types/user.types';
import { getAxiosErrorMessage } from '@/configs/app.config';

import { AuthContext } from './AuthContext';
import { authApi } from './parts/apis/auth.api';
import { userApi } from './parts/apis/user.api';
import { initialAuthState } from './parts/states/auth.state';
import { useSnackbar } from 'notistack';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Function representing an auth provider
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState(initialAuthState.user);
  const [socket, setSocket] = useState(initialAuthState.socket);

  /**
   * Function to get the current authenticated user
   */
  const getUser = useCallback(async () => {
    try {
      const response = await authApi.getUser();
      return response.data;
    } catch {
      return null;
    }
  }, []);

  /**
   * Function to login a user
   */
  const login = useCallback(async (formData: LoginFormData) => {
    try {
      await authApi.login(formData);

      setUser(await getUser());
      navigate('/');
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'login',
        statusHandlers: {
          400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
          401: () => enqueueSnackbar('Invalid username or password.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Function to register a new user
   */
  const register = useCallback(async (formData: RegisterFormData) => {
    try {
      await authApi.register(formData);

      setUser(await getUser());
      navigate('/');
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'registration',
        statusHandlers: {
          400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
          409: () => enqueueSnackbar('Username is already taken.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Function to logout
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();

      setUser(null);
      navigate('/auth/login');
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'logout',
        statusHandlers: {
          401: () => navigate('/auth/login'),
        },
      });
    }

    navigate('/auth/login');
    setUser(null);
  }, []);

  /**
   * Function to update the current user
   */
  const updateUser = useCallback(async (formData: UserFormData) => {
    try {
      const response = await userApi.updateUser(formData);

      setUser(response.data);
      enqueueSnackbar('User updated successfully.', { variant: 'success' });
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'user update',
        statusHandlers: {
          400: () => enqueueSnackbar(getAxiosErrorMessage(400), { variant: 'error' }),
          401: () => navigate('/auth/login'),
          404: () => enqueueSnackbar('User not found.', { variant: 'error' }),
          409: () => enqueueSnackbar('Username is already taken.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Function to delete the current user
   */
  const deleteUser = useCallback(async () => {
    try {
      await userApi.deleteUser();

      setUser(null);
      enqueueSnackbar('User deleted successfully.', { variant: 'success' });

      navigate('/auth/register');
    } catch (error) {
      handleAxiosError({
        error,
        enqueueSnackbar,
        context: 'user deletion',
        statusHandlers: {
          401: () => navigate('/auth/login'),
          404: () => enqueueSnackbar('User not found.', { variant: 'error' }),
        },
      });
    }
  }, []);

  /**
   * Effect to manage socket connection based on auth state
   */
  useEffect(() => {
    if (user && !socket) {
      const s = createConversationsSocket();

      s.connect();
      setSocket(s);

      return;
    }

    if (!user && socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [user]);

  /**
   * Effect to check if the user is authenticated on mount
   */
  useEffect(() => {
    (async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    })();

    return () => {
      socket?.disconnect();
    };
  }, []);

  /**
   * Memoized auth context value
   */
  const value = useMemo(
    () => ({ user, socket, register, login, logout, updateUser, deleteUser }),
    [user, socket, register, login, logout, updateUser, deleteUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
