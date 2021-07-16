import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/model/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user.toJson();
  }

  async updateUser(username: string, data: UpdateUserDto) {
    await this.userRepository.update({ username }, data);
    return this.findByUsername(username);
  }
}
