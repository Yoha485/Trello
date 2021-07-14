import { Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/user.model';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body() credentials: RegisterDto){
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body() credentials: LoginDto){
    return this.authService.login(credentials);
  }
}
