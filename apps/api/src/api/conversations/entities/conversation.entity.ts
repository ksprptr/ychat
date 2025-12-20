import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/api/users/entities/user.entity';
import { AppConfig } from 'src/configs/app.config';

/**
 * Class representing a conversation entity
 */
export class ConversationEntity {
  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "Conversation's id",
  })
  id: string;

  @ApiProperty({
    type: () => UserEntity,
    description: "User A's details",
  })
  userA: UserEntity;

  @ApiProperty({
    type: () => UserEntity,
    description: "User B's details",
  })
  userB: UserEntity;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Conversation's creation date",
  })
  createdAt: Date;
}
