import { AuthGuard } from '../auth/guards/auth.guard';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { CreateMessageReactionDto } from './dto/message-reaction/create-message-reaction.dto';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { SortOrder } from 'prisma/generated/prisma/internal/prismaNamespace';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiPaginatedResponse } from 'src/common/pagination/decorators/paginated-response.decorator';
import { PaginationDto } from 'src/common/pagination/dto/pagination.dto';
import { PaginationEntity } from 'src/common/pagination/entities/pagination.entity';

/**
 * Class representing a conversations controller
 */
@ApiBearerAuth()
@ApiTags('Conversations')
@UseGuards(AuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  /**
   * Controller to get all conversations for the requesting user
   */
  @ApiOperation({ summary: 'Get all conversations' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 20)',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    description: 'Database field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: SortOrder,
    description: 'Sorting direction',
  })
  @ApiPaginatedResponse(ConversationEntity)
  @ApiOkResponse({ type: PaginationEntity<ConversationEntity>, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @Get()
  async findAllConversations(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ): Promise<PaginationEntity<ConversationEntity>> {
    return await this.conversationsService.findAllConversations(paginationDto, request.user);
  }

  /**
   * Controller to get all messages in a conversation
   */
  @ApiOperation({ summary: 'Get all messages in a conversation' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 20)',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    description: 'Database field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: SortOrder,
    description: 'Sorting direction',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Available search fields: content',
  })
  @ApiPaginatedResponse(MessageEntity)
  @ApiOkResponse({ type: PaginationEntity<MessageEntity>, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @Get(':conversationId/messages')
  async findAllMessages(
    @Param('conversationId') conversationId: string,
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    return await this.conversationsService.findAllMessages(
      conversationId,
      paginationDto,
      request.user,
    );
  }

  /**
   * Controller to create a new message
   */
  @ApiOperation({ summary: 'Create a new message' })
  @ApiCreatedResponse({ type: MessageEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @Post(':conversationId/messages')
  async createMessage(
    @Param('conversationId') conversationId: string,
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: Request,
  ): Promise<MessageEntity> {
    return await this.conversationsService.createMessage(
      conversationId,
      createMessageDto,
      request.user,
    );
  }

  /**
   * Controller to update a message
   */
  @ApiOperation({ summary: 'Update a message' })
  @ApiOkResponse({ type: MessageEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @Patch(':conversationId/messages/:messageId')
  async updateMessage(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: Request,
  ): Promise<MessageEntity> {
    return await this.conversationsService.updateMessage(
      conversationId,
      messageId,
      createMessageDto,
      request.user,
    );
  }

  /**
   * Controller to delete a message
   */
  @ApiOperation({ summary: 'Delete a message' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @HttpCode(204)
  @Delete(':conversationId/messages/:messageId')
  async deleteMessage(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
    @Req() request: Request,
  ): Promise<void> {
    await this.conversationsService.deleteMessage(conversationId, messageId, request.user);
  }

  /**
   * Controller to toggle a reaction on a message
   */
  @ApiOperation({ summary: 'Toggle reaction on a message' })
  @ApiOkResponse({ type: ResponseEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @HttpCode(200)
  @Post(':conversationId/messages/:messageId/reaction')
  async toggleReaction(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
    @Body() createMessageReactionDto: CreateMessageReactionDto,
    @Req() request: Request,
  ): Promise<ResponseEntity> {
    return await this.conversationsService.toggleReaction(
      conversationId,
      messageId,
      createMessageReactionDto,
      request.user,
    );
  }
}
