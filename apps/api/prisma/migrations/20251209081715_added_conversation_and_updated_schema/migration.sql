/*
  Warnings:

  - You are about to drop the column `recipientId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `reactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId,userId,emoji]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversationId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `reactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_recipientId_fkey";

-- DropIndex
DROP INDEX "idx_recipientId";

-- DropIndex
DROP INDEX "idx_senderId";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "recipientId",
ADD COLUMN     "conversationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "symbol",
ADD COLUMN     "emoji" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAId" TEXT NOT NULL,
    "userBId" TEXT NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversations_userAId_userBId_key" ON "conversations"("userAId", "userBId");

-- CreateIndex
CREATE INDEX "messages_conversationId_createdAt_idx" ON "messages"("conversationId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_messageId_userId_emoji_key" ON "reactions"("messageId", "userId", "emoji");

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
