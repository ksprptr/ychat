import { AuthModule } from './api/auth/auth.module';
import { ConversationsModule } from './api/conversations/conversations.module';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * Class representing an app module
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,

    AuthModule,
    UsersModule,
    ConversationsModule,
  ],
})
export class AppModule {}
