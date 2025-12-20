import { PrismaService } from './prisma.service';
import { Global, Module } from '@nestjs/common';

/**
 * Class representing a prisma module
 */
@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
