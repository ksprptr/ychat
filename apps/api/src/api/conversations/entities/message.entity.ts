import { MessageReactionEntity } from './message-reaction.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/api/users/entities/user.entity';
import { AppConfig } from 'src/configs/app.config';

/**
 * Class representing a message entity
 */
export class MessageEntity {
  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "Message's id",
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Hello, world!',
    description: "Messages's content",
  })
  content: string;

  @ApiProperty({
    type: () => UserEntity,
    description: "Message's sender",
  })
  sender: UserEntity;

  @ApiProperty({
    type: () => [MessageReactionEntity],
    description: "Message's reactions",
  })
  reactions: MessageReactionEntity[];

  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "Message conversation's id",
  })
  conversationId: string;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Message's creation date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Message's last update date",
  })
  updatedAt: Date;
}
