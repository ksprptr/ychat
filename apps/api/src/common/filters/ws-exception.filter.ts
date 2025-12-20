import { ArgumentsHost, Catch, Logger, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

/**
 * Class representing a websocket exception filter
 */
@Catch()
export class WebsocketExceptionFilter implements WsExceptionFilter {
  private readonly logger = new Logger(WebsocketExceptionFilter.name);

  /**
   * Function to catch and handle websocket exceptions
   */
  catch(exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();

    socket.emit('exception', {
      status: 'error',
      message: exception.message || 'An error occurred',
    });

    this.logger.warn(`WebSocket Exception: ${exception.message}`);
  }
}
