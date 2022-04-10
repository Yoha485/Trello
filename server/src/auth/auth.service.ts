import { ConflictException, Logger } from '@nestjs/common';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RegisterDto, LoginDto } from 'src/user/user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  private readonly logger;

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger()
  }

  async register(credentials: RegisterDto): Promise<any> {
    try {
      const user = this.userRepository.create({
        ...credentials,
        password: bcrypt.hashSync(credentials.password, 10),
      });
      await user.save();
      const payload = { id: user.id };
      const token = this.jwtService.sign(payload);
      this.logger.log('User registered', String(user.id))
      return { user: { ...user.toJson(), token } };
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error('Username has already been taken', err)
        throw new ConflictException('Username has already been taken');
      }
      this.logger.error(err)
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { id: user.id };
      const token = this.jwtService.sign(payload);
      this.logger.log('User Logged in', user.id)
      return { user: { ...user.toJson(), token } };
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
