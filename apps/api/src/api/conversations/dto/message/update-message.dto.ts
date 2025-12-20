import { CreateMessageDto } from './create-message.dto';
import { PartialType } from '@nestjs/swagger';

/**
 * Class representing an update message dto
 */
export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
