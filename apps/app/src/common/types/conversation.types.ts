import { User } from './user.types';

export interface Conversation {
  id: string;
  userA: User;
  userB: User;
  createdAt: string;
}
