import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

/**
 * Class representing an auth module
 */
@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
