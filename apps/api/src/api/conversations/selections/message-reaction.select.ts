import { Prisma } from 'prisma/generated/prisma/client';
import { userSelect } from 'src/api/users/selections/user.select';

export const messageReactionSelect = {
  id: true,
  emoji: true,
  user: {
    select: userSelect,
  },
  messageId: true,
  createdAt: true,
} as const satisfies Prisma.MessageReactionSelect;
