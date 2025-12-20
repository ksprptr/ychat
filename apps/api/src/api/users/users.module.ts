import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

/**
 * Class representing a users module
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
