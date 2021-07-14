import { ConflictException } from '@nestjs/common';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RegisterDto, LoginDto } from 'src/model/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(credentials: RegisterDto) {
    try {
      const user = this.userRepository.create(credentials);
      await user.save();
      return user.toJson();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has alredy been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');;
      }
      return user.toJson();
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
