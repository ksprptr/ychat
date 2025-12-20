import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Class representing a login dto
 */
export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'john_doe',
    description: "User's username",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'SuperSecretPassword123.',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
