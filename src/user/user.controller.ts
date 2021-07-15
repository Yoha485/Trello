import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'src/model/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { username }: UserEntity) {
    return this.userService.findByUsername(username);
  }

  @Put()
  @UseGuards(AuthGuard())
  update(@User() { username }: UserEntity, @Body(ValidationPipe) data: UpdateUserDto) {
    return this.userService.updateUser(username, data);
  }
}
