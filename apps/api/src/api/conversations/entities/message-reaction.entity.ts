import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/api/users/entities/user.entity';
import { AppConfig } from 'src/configs/app.config';

/**
 * Class representing a message reaction entity
 */
export class MessageReactionEntity {
  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "Message reaction's id",
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: '👍',
    description: "Message reaction's emoji",
  })
  emoji: string;

  @ApiProperty({
    type: () => UserEntity,
    description: "Message reaction's user",
  })
  user: UserEntity;

  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "Message's id",
  })
  messageId: string;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Message reaction's creation date",
  })
  createdAt: Date;
}
