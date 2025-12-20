import { UserEntity } from '../users/entities/user.entity';
import { userSelect as select } from '../users/selections/user.select';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/wasm-compiler-edge';
import { RequestUser } from 'src/common/types/express.user.types';
import { getEnvNumber, getEnvString } from 'src/common/utils/env.functions';
import { comparePassword, hashPassword } from 'src/common/utils/password.functions';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Class representing an auth service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Function to get currently logged in user
   */
  async findCurrentUser(requestUser: RequestUser): Promise<UserEntity> {
    if (!requestUser || !requestUser.sub) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: requestUser.sub },
      select,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Function to login a user
   */
  async login(loginDto: LoginDto): Promise<Tokens> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { username, deletedAt: null, isActive: true },
      select: { id: true, password: true, isActive: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch || !user.isActive) throw new UnauthorizedException('Invalid credentials');

    const requestUser: RequestUser = { sub: user.id };

    return this.generateTokens(requestUser);
  }

  /**
   * Function to register a new user
   */
  async register(registerDto: RegisterDto): Promise<Tokens> {
    const { username, password, acceptTerms } = registerDto;

    if (!acceptTerms) {
      throw new ConflictException('Terms must be accepted');
    }

    try {
      const newUser = await this.prismaService.user.create({
        data: { username, password: await hashPassword(password) },
      });

      const users = await this.prismaService.user.findMany({
        where: { deletedAt: null, isActive: true },
        select: { id: true },
      });

      // NOTE:
      // Conversations are eagerly created between the new user and all existing users.
      // This is a deliberate simplification for demonstration / school project purposes.
      // In a real-world application, conversations should be created lazily
      // (e.g. when users actually start chatting).
      await this.prismaService.conversation.createMany({
        data: [
          ...users
            .filter((user) => user.id !== newUser.id)
            .map((user) => ({ userAId: newUser.id, userBId: user.id })),
        ],
        skipDuplicates: true,
      });

      const requestUser: RequestUser = { sub: newUser.id };

      return this.generateTokens(requestUser);
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error;
      }

      switch (error.code) {
        case 'P2002':
          throw new ConflictException('User with this username already exists');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to generate JWT tokens
   */
  private async generateTokens(payload: RequestUser): Promise<Tokens> {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: getEnvString('JWT_SECRET'),
        expiresIn: getEnvNumber('JWT_EXPIRES_IN'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: getEnvString('JWT_REFRESH_SECRET'),
        expiresIn: getEnvNumber('JWT_REFRESH_EXPIRES_IN'),
      }),
    };
  }
}
