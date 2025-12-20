import http from '@/common/services/axios/axios.instance';
import { LoginFormData, RegisterFormData } from '@/common/types/auth.types';
import { User } from '@/common/types/user.types';

/**
 * Object representing api calls related to authentication
 */
export const authApi = {
  getUser: () => http.get<User>('/auth/me'),

  login: (formData: LoginFormData) =>
    http.post('/auth/login', {
      username: formData.username,
      password: formData.password,
    }),

  register: (formData: RegisterFormData) =>
    http.post('/auth/register', {
      username: formData.username,
      password: formData.password,
      acceptTerms: formData.acceptTerms,
    }),

  logout: () => http.post('/auth/logout'),
};
