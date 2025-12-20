import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Class representing a register dto
 */
export class RegisterDto {
  @ApiProperty({
    type: 'string',
    example: 'john_doe',
    description: "User's username",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'SuperSecretPassword123.',
    description: "User's password",
  })
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
  password: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
    description: 'User agreement to terms and conditions',
  })
  @IsBoolean()
  acceptTerms: boolean;
}
