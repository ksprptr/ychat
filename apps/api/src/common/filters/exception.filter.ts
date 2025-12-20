import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Class representing a global exception filter
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  /**
   * Function to catch and handle http exceptions
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle HttpExceptions (thrown explicitly, e.g. ConflictException, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'object' && exceptionResponse !== null
          ? (exceptionResponse as any).message || 'An error occurred'
          : String(exceptionResponse);

      const logFn = status >= 500 ? this.logger.error : this.logger.warn;
      logFn.call(`[${status}] ${request.method} ${request.url} - ${JSON.stringify(message)}`, '');

      return response.status(status).json({ status, message });
    }

    // Handle unknown errors (runtime, Prisma, etc.)
    this.logger.error(
      `Unhandled exception at ${request.method} ${request.url} from ${request.ip}`,
      exception instanceof Error ? exception : String(exception),
    );

    return response.status(500).json({ status: 500, message: 'An unexpected error occurred' });
  }
}
