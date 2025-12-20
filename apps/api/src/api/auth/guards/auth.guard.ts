import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtRequestUser, RequestUser } from 'src/common/types/express.user.types';
import { getEnvNumber, getEnvString } from 'src/common/utils/env.functions';
import * as tokenHelpers from 'src/common/utils/token.functions';

/**
 * Class representing an auth guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Function to check if the user is authorized
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = tokenHelpers.extractTokenFromCookies('accessToken', request);
    const refreshToken = tokenHelpers.extractTokenFromCookies('refreshToken', request);
    const payload = accessToken ? await this.tryVerify(accessToken) : null;

    if (!payload && refreshToken) {
      const refreshResult = await this.tryRefresh(refreshToken);

      if (!request.res) {
        throw new InternalServerErrorException('Response object is not available');
      }

      await tokenHelpers.addTokenToResponse(
        request.res,
        'accessToken',
        refreshResult.newAccessToken,
      );

      request.user = refreshResult.payload;
      return true;
    }

    if (!payload) {
      throw new UnauthorizedException();
    }

    request.user = payload;
    return true;
  }

  /**
   * Function to try verify a token and return a payload if valid, or null if expired
   */
  async tryVerify(token: string): Promise<RequestUser | null> {
    try {
      const payload: JwtRequestUser = await this.jwtService.verifyAsync(token, {
        secret: getEnvString('JWT_SECRET'),
      });
      const { iat: _, exp: __, ...cleanPayload } = payload;

      if (!cleanPayload) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return cleanPayload;
    } catch (error) {
      if (!(error instanceof JsonWebTokenError)) {
        throw error;
      }

      switch (error.name) {
        case 'TokenExpiredError':
          return null;
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid token');
        default:
          throw error;
      }
    }
  }

  /**
   * Function to try refresh the access token
   */
  async tryRefresh(
    refreshToken: string,
  ): Promise<{ newAccessToken: string; payload: RequestUser }> {
    try {
      const payload: JwtRequestUser = await this.jwtService.verifyAsync(refreshToken, {
        secret: getEnvString('JWT_REFRESH_SECRET'),
      });
      const { iat: _, exp: __, ...cleanPayload } = payload;

      if (!cleanPayload) {
        throw new UnauthorizedException('Invalid refresh token payload');
      }

      const newAccessToken = await this.jwtService.signAsync(cleanPayload, {
        expiresIn: getEnvNumber('JWT_EXPIRES_IN'),
        secret: getEnvString('JWT_SECRET'),
      });

      return { newAccessToken, payload: cleanPayload };
    } catch (error) {
      if (!(error instanceof JsonWebTokenError)) {
        throw error;
      }

      switch (error.name) {
        case 'TokenExpiredError':
          throw new UnauthorizedException();
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid refresh token');
        default:
          throw error;
      }
    }
  }
}
