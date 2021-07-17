import { ConflictException } from '@nestjs/common';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RegisterDto, LoginDto } from 'src/user/user.dto';
import * as bcrypt from 'bcryptjs'
import { UserRepository } from 'src/user/user.repository';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDto): Promise<any> {
    try {
      const user = this.userRepository.create({...credentials, password:
        bcrypt.hashSync(credentials.password,10)});
      await user.save();
      const payload = { id: user.id };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJson(), token } };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has alredy been taken');
      }
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
      const payload = { id : user.id };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJson(), token } };
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
