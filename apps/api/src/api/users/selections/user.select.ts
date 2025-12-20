import { Prisma } from 'prisma/generated/prisma/client';

export const userSelect = {
  id: true,
  username: true,
  avatarUrl: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.UserSelect;
