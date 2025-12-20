import { WsAuthGuard } from '../auth/guards/ws-auth.guard';
import { MessageEntity } from './entities/message.entity';
import { MessageReactionEntity } from './entities/message-reaction.entity';
import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketExceptionFilter } from 'src/common/filters/ws-exception.filter';
import { RequestUser } from 'src/common/types/express.user.types';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Class representing a conversations gateway
 */
@WebSocketGateway({
  namespace: 'ws/conversations',
  cors: { origin: '*', credentials: true },
})
@UseFilters(new WebsocketExceptionFilter())
export class ConversationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(ConversationsGateway.name);

  constructor(
    private readonly wsAuthGuard: WsAuthGuard,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Function representing a new websocket connection handler
   */
  async handleConnection(client: Socket) {
    try {
      await this.wsAuthGuard.isAuthorized(client);
      const user: RequestUser = client.data.user;

      const userConversations = await this.prisma.conversation.findMany({
        where: { OR: [{ userAId: user.sub }, { userBId: user.sub }] },
        select: { id: true },
      });

      userConversations.forEach((conversation) => {
        client.join(`conversation:${conversation.id}`);
      });
    } catch (error) {
      client.emit('exception', {
        status: 'error',
        message: error.message || 'An error occurred during authentication',
      });

      this.logger.warn(`WebSocket Exception: ${error.message}`);

      client.disconnect();
      return;
    }

    this.logger.log(
      `Registered new WebSocket client: ${client.id}, userId: ${client.data.user.sub}`,
    );
  }

  /**
   * Function representing a disconnect handler
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`WebSocket client disconnected: ${client.id}`);
  }

  /**
   * Function representing a create message handler
   */
  async createMessage(message: MessageEntity, conversationId: string) {
    this.emitToConversationRoom(conversationId, 'message.created', message);
  }

  /**
   * Function representing an update message handler
   */
  async updateMessage(message: MessageEntity, conversationId: string) {
    this.emitToConversationRoom(conversationId, 'message.updated', message);
  }

  /**
   * Function representing an add reaction handler
   */
  async addReaction(reaction: MessageReactionEntity, conversationId: string) {
    this.emitToConversationRoom(conversationId, 'reaction.added', reaction);
  }

  /**
   * Function representing a remove reaction handler
   */
  async removeReaction(reaction: MessageReactionEntity, conversationId: string) {
    this.emitToConversationRoom(conversationId, 'reaction.removed', reaction);
  }

  /**
   * Function representing a delete message handler
   */
  async deleteMessage(message: MessageEntity, conversationId: string) {
    this.emitToConversationRoom(conversationId, 'message.deleted', message);
  }

  /**
   * Function representing an emit to conversation room
   */
  private emitToConversationRoom(conversationId: string, event: string, data: any) {
    this.server.to(`conversation:${conversationId}`).emit(event, data);
  }
}
