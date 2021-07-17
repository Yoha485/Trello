import { Post, Body, ValidationPipe } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) credentials: RegisterDto): Promise<any> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }
}
