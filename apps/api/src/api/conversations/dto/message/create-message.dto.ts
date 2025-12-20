import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Class representing a create message dto
 */
export class CreateMessageDto {
  @ApiProperty({
    type: 'string',
    example: 'Hello, world!',
    description: "Messages's content",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
