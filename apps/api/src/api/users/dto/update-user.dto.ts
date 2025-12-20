import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
} from 'class-validator';

/**
 * Class representing an update user dto
 */
export class UpdateUserDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'john@doe.com',
    description: "User's username",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'https://example.com/avatar.jpg',
    description: "User's avatar URL",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'SuperSecretPassword123.',
    description: "User's password",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;
}
