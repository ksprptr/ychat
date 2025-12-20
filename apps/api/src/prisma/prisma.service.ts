import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/generated/prisma/client';
import { AppConfig } from 'src/configs/app.config';

/**
 * Class representing a prisma service
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: AppConfig.getPgConnectionString() });

    super({ adapter });
  }
}
