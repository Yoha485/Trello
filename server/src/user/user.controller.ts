import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'src/user/user.dto';
import { UserEntity } from './user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('Token')
@ApiTags('User')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Get user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  findCurrentUser(@User('id') id: number): Promise<Record<string, any>> {
    return this.userService.findById(id);
  }

  @Patch()
  @ApiOkResponse({ description: 'Update user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @User('id') userId: number,
    @Body() data: UpdateUserDto,
  ): Object {
    return this.userService.updateUser(userId, data);
  }

  @Delete()
  @ApiOkResponse({ description: 'Delete user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@User('id') userId: number): Promise<UserEntity> {
    return this.userService.deleteUser(userId);
  }
}
