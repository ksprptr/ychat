import { ApiProperty } from '@nestjs/swagger';
import { AppConfig } from 'src/configs/app.config';

/**
 * Class representing a user entity
 */
export class UserEntity {
  @ApiProperty({
    type: 'string',
    example: AppConfig.getOpenApiExample('uuid'),
    description: "User's id",
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'john_doe',
    description: "User's username",
  })
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'https://example.com/avatar.jpg',
    description: "User's avatar URL",
  })
  avatarUrl: string | null;

  @ApiProperty({
    type: 'boolean',
    example: true,
    description: "User's active state",
  })
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "User's creation date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "User's last update date",
  })
  updatedAt: Date;
}
