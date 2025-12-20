import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Delete, HttpCode, Patch, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNoContentResponse,
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
 * Class representing a users controller
 */
@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Controller to update a request user
   */
  @ApiOperation({ summary: 'Update a request user' })
  @ApiOkResponse({ type: UserEntity, description: 'Successful' })
  @ApiBadRequestResponse({ type: ResponseEntity, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @ApiConflictResponse({ type: ResponseEntity, description: 'Conflict occurred' })
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request): Promise<UserEntity> {
    return await this.usersService.update(updateUserDto, request.user);
  }

  /**
   * Controller to delete a request user
   */
  @ApiOperation({ summary: 'Delete a request user' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiUnauthorizedResponse({ type: ResponseEntity, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: ResponseEntity, description: 'Resource not found' })
  @HttpCode(204)
  @Delete('me')
  async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
    await this.usersService.delete(request.user);
    await addTokenToResponse(response, 'accessToken', '', { maxAge: 0 });
    await addTokenToResponse(response, 'refreshToken', '', { maxAge: 0 });

    response.status(204).send();
  }
}
