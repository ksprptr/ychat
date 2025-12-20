import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEnvString } from 'src/common/utils/env.functions';
import { hashPassword } from 'src/common/utils/password.functions';
import { AppConfig } from 'src/configs/app.config';

const adapter = new PrismaPg({ connectionString: AppConfig.getPgConnectionString() });
const prisma = new PrismaClient({ adapter });

/**
 * Function representing a seeding script for a database using Prisma ORM
 */
async function main() {
  const password = await hashPassword(getEnvString('PRISMA_SEED_EXAMPLE_PASSWORD'));

  // Create users
  const [user1, user2, user3] = await Promise.all([
    prisma.user.create({ data: { username: 'john_doe', password } }),
    prisma.user.create({ data: { username: 'jane_doe', password } }),
    prisma.user.create({ data: { username: 'alice_smith', password } }),
  ]);

  // Create conversations
  const [conversation1, conversation2, conversation3] = await Promise.all([
    prisma.conversation.create({ data: { userAId: user1.id, userBId: user2.id } }),
    prisma.conversation.create({ data: { userAId: user2.id, userBId: user3.id } }),
    prisma.conversation.create({ data: { userAId: user1.id, userBId: user3.id } }),
  ]);

  // Create messages
  const [message1, _message2, message3, _message4, _message5, message6] = await Promise.all([
    prisma.message.create({
      data: {
        conversationId: conversation1.id,
        senderId: user1.id,
        content: 'Hello Jane!',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation1.id,
        senderId: user2.id,
        content: 'Hi John! How are you?',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation2.id,
        senderId: user2.id,
        content: 'Hey Alice, long time no see!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation2.id,
        senderId: user3.id,
        content: 'Indeed, Jane! How have you been?',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation3.id,
        senderId: user1.id,
        content: 'Hi Alice, want to catch up sometime?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation3.id,
        senderId: user3.id,
        content: "Sure John, let's do it!",
      },
    }),
  ]);

  // Create reactions
  await Promise.all([
    prisma.messageReaction.create({
      data: { emoji: '👍', messageId: message1.id, userId: user2.id },
    }),
    prisma.messageReaction.create({
      data: { emoji: '😮', messageId: message3.id, userId: user3.id },
    }),
    prisma.messageReaction.create({
      data: { emoji: '👍', messageId: message6.id, userId: user1.id },
    }),
  ]);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(`Error during seeding: ${error}`);

    await prisma.$disconnect();

    process.exit(1);
  });
