import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import * as cookie from 'cookie';
import { Socket } from 'socket.io';
import { JwtRequestUser, RequestUser } from 'src/common/types/express.user.types';
import { getEnvString } from 'src/common/utils/env.functions';

/**
 * Class representing a websocket auth guard
 */
@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();

    return await this.isAuthorized(client);
  }

  /**
   * Function to check if the user is authorized
   */
  async isAuthorized(client: Socket): Promise<boolean> {
    const cookiesHeader = client.handshake.headers.cookie;

    if (!cookiesHeader) throw new WsException('Unauthorized');

    const cookies = cookie.parse(cookiesHeader);
    const accessToken = cookies['accessToken'];

    if (!accessToken) throw new WsException('Unauthorized');

    try {
      const payload: JwtRequestUser = await this.jwtService.verifyAsync(accessToken, {
        secret: getEnvString('JWT_SECRET'),
      });
      const { iat: _, exp: __, ...cleanPayload } = payload;

      client.data.user = cleanPayload as RequestUser;

      return true;
    } catch {
      throw new WsException('Unauthorized');
    }
  }
}
