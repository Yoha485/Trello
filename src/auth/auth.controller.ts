import { Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({description: 'User registration'})
  @ApiInternalServerErrorResponse({description: 'Cannot create user'})
  @ApiConflictResponse({description: 'Username already taken'})
  @ApiBadRequestResponse({description: 'Inapropriate data'})
  @ApiBody({type: RegisterDto})
  register(@Body() credentials: RegisterDto): Promise<any> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({description: 'User login'})
  @ApiUnauthorizedResponse({description: 'Invalid credentials'})
  @ApiBody({type: LoginDto})
  login(@Body() credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }
}
