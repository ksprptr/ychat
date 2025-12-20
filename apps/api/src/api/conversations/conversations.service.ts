import { ConversationsGateway } from './conversations.gateway';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { UpdateMessageDto } from './dto/message/update-message.dto';
import { CreateMessageReactionDto } from './dto/message-reaction/create-message-reaction.dto';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import { conversationSelect } from './selections/conversation.select';
import { messageSelect as select } from './selections/message.select';
import { messageReactionSelect } from './selections/message-reaction.select';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from 'prisma/generated/prisma/internal/prismaNamespace';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { PaginationDto } from 'src/common/pagination/dto/pagination.dto';
import { PaginationEntity } from 'src/common/pagination/entities/pagination.entity';
import { RequestUser } from 'src/common/types/express.user.types';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Class representing a conversations service
 */
@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly conversationsGateway: ConversationsGateway,
  ) {}

  /**
   * Function to get all conversations for the requesting user
   */
  async findAllConversations(
    paginationDto: PaginationDto,
    requestUser?: RequestUser,
  ): Promise<PaginationEntity<ConversationEntity>> {
    if (!requestUser) throw new UnauthorizedException();

    const { page, limit, sortField, sortOrder } = paginationDto;

    const where: Prisma.ConversationWhereInput = {
      OR: [{ userAId: requestUser.sub }, { userBId: requestUser.sub }],
    };

    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.conversation.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          select: conversationSelect,
          orderBy: { [sortField]: sortOrder.toLowerCase() },
        }),
        this.prisma.conversation.count({ where }),
      ]);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
          sortField,
          sortOrder,
        },
      };
    } catch (error) {
      if (!(error instanceof PrismaClientValidationError)) {
        throw error;
      }

      throw new BadRequestException('Invalid pagination parameters');
    }
  }

  /**
   * Function to get all messages in a conversation
   */
  async findAllMessages(
    conversationId: string,
    paginationDto: PaginationDto,
    requestUser?: RequestUser,
  ): Promise<PaginationEntity<MessageEntity>> {
    if (!requestUser) throw new UnauthorizedException();

    const { page, limit, sortField, sortOrder, search } = paginationDto;

    const where: Prisma.MessageWhereInput | undefined = search
      ? { OR: [{ content: { contains: search, mode: 'insensitive' } }] }
      : undefined;

    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.message.findMany({
          where: { ...where, conversationId },
          skip: (page - 1) * limit,
          take: limit,
          select,
          orderBy: { [sortField]: sortOrder.toLowerCase() },
        }),
        this.prisma.message.count({ where: { ...where, conversationId } }),
      ]);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
          sortField,
          sortOrder,
          ...(search && { search }),
        },
      };
    } catch (error) {
      if (!(error instanceof PrismaClientValidationError)) {
        throw error;
      }

      throw new BadRequestException('Invalid pagination parameters');
    }
  }

  /**
   * Function to create a new message
   */
  async createMessage(
    conversationId: string,
    createMessageDto: CreateMessageDto,
    requestUser?: RequestUser,
  ): Promise<MessageEntity> {
    if (!requestUser) throw new UnauthorizedException();

    await this.checkIfNotDeleted(conversationId, requestUser);

    try {
      const createdMessage = await this.prisma.message.create({
        data: { conversationId, senderId: requestUser.sub, content: createMessageDto.content },
        select,
      });

      await this.conversationsGateway.createMessage(createdMessage, conversationId);

      return createdMessage;
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2003':
        case 'P2025':
          throw new NotFoundException('Conversation not found');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to update a message
   */
  async updateMessage(
    conversationId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
    requestUser?: RequestUser,
  ): Promise<MessageEntity> {
    if (!requestUser) throw new UnauthorizedException();

    await this.checkIfNotDeleted(conversationId, requestUser);

    try {
      const updatedMessage = await this.prisma.message.update({
        where: { id: messageId, conversationId, senderId: requestUser.sub },
        data: { content: updateMessageDto.content },
        select,
      });

      await this.conversationsGateway.updateMessage(updatedMessage, conversationId);

      return updatedMessage;
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException('Message not found');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to delete a message
   */
  async deleteMessage(
    conversationId: string,
    messageId: string,
    requestUser?: RequestUser,
  ): Promise<void> {
    if (!requestUser) throw new UnauthorizedException();

    await this.checkIfNotDeleted(conversationId, requestUser);

    try {
      const deletedMessage = await this.prisma.message.delete({
        where: { id: messageId, conversationId, senderId: requestUser.sub },
        select,
      });

      await this.conversationsGateway.deleteMessage(deletedMessage, conversationId);
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException('Message not found');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to toggle a reaction on a message
   */
  async toggleReaction(
    conversationId: string,
    messageId: string,
    createMessageReactionDto: CreateMessageReactionDto,
    requestUser?: RequestUser,
  ): Promise<ResponseEntity> {
    if (!requestUser) throw new UnauthorizedException();

    await this.checkIfNotDeleted(conversationId, requestUser);

    const { emoji } = createMessageReactionDto;

    const message = await this.prisma.message.findUnique({
      where: { id: messageId, conversationId },
      select: { id: true },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const existing = await this.prisma.messageReaction.findFirst({
      where: { messageId: message.id, userId: requestUser.sub, emoji },
      select: { id: true },
    });

    try {
      if (existing) {
        const removedReaction = await this.prisma.messageReaction.delete({
          where: { id: existing.id },
          select: messageReactionSelect,
        });

        await this.conversationsGateway.removeReaction(removedReaction, conversationId);

        return { status: 200, message: 'Reaction removed successfully' };
      }

      const addedReaction = await this.prisma.messageReaction.create({
        data: { messageId: message.id, userId: requestUser.sub, emoji },
        select: messageReactionSelect,
      });

      await this.conversationsGateway.addReaction(addedReaction, conversationId);

      return { status: 200, message: 'Reaction added successfully' };
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException('Message not found');
        default:
          throw error;
      }
    }
  }

  /**
   * Function representing a check if the other user in the conversation is not deleted
   */
  private async checkIfNotDeleted(conversationId: string, requestUser: RequestUser) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        id: true,
        userA: { select: { id: true, isActive: true, deletedAt: true } },
        userB: { select: { id: true, isActive: true, deletedAt: true } },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const otherUser =
      conversation.userA.id === requestUser.sub ? conversation.userB : conversation.userA;

    if (!otherUser.isActive || otherUser.deletedAt) {
      throw new ConflictException('Cannot interact with a deleted user');
    }
  }
}
