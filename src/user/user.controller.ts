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

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findCurrentUser(@User('id') id: number): Promise<Record<string, any>> {
    return this.userService.findById(id);
  }

  @Patch()
  update(
    @User('id') userId: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, data);
  }

  @Delete()
  delete(@User('id') userId: number): Promise<UserEntity> {
    return this.userService.deleteUser(userId);
  }
}
