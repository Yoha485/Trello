import { Body, Controller, Delete, Get, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'src/user/user.dto';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findCurrentUser(@User('id') id  : number) {
    return this.userService.findById(id);
  }

  @Patch()
  update(@User('id')  userId : number, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(userId, data);
  }

  @Delete()
  delete(@User('id') userId: number){
    return this.userService.deleteUser(userId);
  }
}
