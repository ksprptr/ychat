import { messageReactionSelect } from './message-reaction.select';
import { Prisma } from 'prisma/generated/prisma/client';
import { userSelect } from 'src/api/users/selections/user.select';

export const messageSelect = {
  id: true,
  content: true,
  sender: {
    select: userSelect,
  },
  reactions: {
    select: messageReactionSelect,
  },
  conversationId: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.MessageSelect;
