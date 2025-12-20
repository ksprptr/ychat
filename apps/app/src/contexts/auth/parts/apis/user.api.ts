import http from '@/common/services/axios/axios.instance';
import { User, UserFormData } from '@/common/types/user.types';
import { removeEmptyStrings } from '@/common/utils/object.functions';

/**
 * Object representing api calls related to user management
 */
export const userApi = {
  updateUser: (formData: UserFormData) =>
    http.patch<User>('/users/me', {
      ...removeEmptyStrings(
        {
          username: formData.username,
          avatarUrl: formData.avatarUrl,
          password: formData.password,
        },
        ['avatarUrl'],
      ),
    }),

  deleteUser: () => http.delete('/users/me'),
};
