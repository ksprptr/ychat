import { WsAuthGuard } from '../auth/guards/ws-auth.guard';
import { ConversationsController } from './conversations.controller';
import { ConversationsGateway } from './conversations.gateway';
import { ConversationsService } from './conversations.service';
import { Module } from '@nestjs/common';

/**
 * Class representing a conversations module
 */
@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsGateway, WsAuthGuard],
})
export class ConversationsModule {}
