import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmoji } from 'src/common/decorators/is-emoji.decorator';

/**
 * Class representing a create message reaction dto
 */
export class CreateMessageReactionDto {
  @ApiProperty({
    type: 'string',
    example: '👍',
    description: "Message reaction's emoji",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmoji()
  emoji: string;
}
