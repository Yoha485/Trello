import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UpdateUserDto } from 'src/user/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<Record<string, any>> {
    const user = await this.userRepository.findOne(id);
    return user.toJson();
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
