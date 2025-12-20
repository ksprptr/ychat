import { userSchema } from '../validations/user.validations';
import z from 'zod';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserFormData = z.infer<typeof userSchema>;
