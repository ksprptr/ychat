import { Prisma } from 'prisma/generated/prisma/client';
import { userSelect } from 'src/api/users/selections/user.select';

export const conversationSelect = {
  id: true,
  userA: {
    select: userSelect,
  },
  userB: {
    select: userSelect,
  },
  createdAt: true,
} as const satisfies Prisma.ConversationSelect;
