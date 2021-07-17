import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UpdateUserDto } from 'src/user/user.dto';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<Record<string, any>> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user.toJson();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return this.userRepository.save({ ...user, ...data });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      await this.userRepository.delete(user);
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
