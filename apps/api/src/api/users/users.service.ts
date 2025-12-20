import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { userSelect as select } from './selections/user.select';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client-runtime-utils';
import { RequestUser } from 'src/common/types/express.user.types';
import { hashPassword } from 'src/common/utils/password.functions';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Class representing a users service
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Function to update a request user
   */
  async update(updateUserDto: UpdateUserDto, requestUser?: RequestUser): Promise<UserEntity> {
    if (!requestUser) throw new UnauthorizedException();

    const { password, ...rest } = updateUserDto;

    try {
      return await this.prisma.user.update({
        where: { id: requestUser.sub },
        data: {
          ...rest,
          ...(password && { password: await hashPassword(password) }),
        },
        select,
      });
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2002':
          throw new ConflictException('User with this username already exists');
        case 'P2025':
          throw new NotFoundException('User not found');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to delete a request user
   */
  async delete(requestUser?: RequestUser): Promise<void> {
    if (!requestUser) throw new UnauthorizedException();
    try {
      await this.prisma.user.update({
        where: { id: requestUser.sub, deletedAt: null },
        data: {
          username: `deleted_${requestUser.sub.split('-')[0]}`,
          avatarUrl: null,
          isActive: false,
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException('User not found');
        default:
          throw error;
      }
    }
  }
}
