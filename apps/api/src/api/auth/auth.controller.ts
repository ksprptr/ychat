import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { addTokenToResponse } from 'src/common/utils/token.functions';

/**
 * Class representing an auth controller
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Controller to get currently logged in user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get currently logged in user' })
  @ApiOkResponse({ type: UserEntity, description: 'Successful' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @UseGuards(AuthGuard)
  @Get('me')
  async findCurrentUser(@Req() request: Request): Promise<UserEntity> {
    if (!request.user) throw new UnauthorizedException();

    return this.authService.findCurrentUser(request.user);
  }

  /**
   * Controller to login a user
   */
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({ type: ResponseEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);

    await addTokenToResponse(response, 'accessToken', accessToken);
    await addTokenToResponse(response, 'refreshToken', refreshToken);

    response.status(200).send({ status: 200, message: 'Logged in successfully' });
  }

  /**
   * Controller to register a new user
   */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: ResponseEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiConflictResponse({ type: ResponseEntity, description: 'Conflict occurred' })
  @HttpCode(200)
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const { accessToken, refreshToken } = await this.authService.register(registerDto);

    await addTokenToResponse(response, 'accessToken', accessToken);
    await addTokenToResponse(response, 'refreshToken', refreshToken);

    response.status(200).send({ status: 200, message: 'Registered successfully' });
  }

  /**
   * Controller to logout
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out a user' })
  @ApiOkResponse({ type: ResponseEntity, description: 'Successful' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res() response: Response) {
    await addTokenToResponse(response, 'accessToken', '', { maxAge: 0 });
    await addTokenToResponse(response, 'refreshToken', '', { maxAge: 0 });

    response.status(200).send({ status: 200, message: 'Logged out successfully' });
  }
}
