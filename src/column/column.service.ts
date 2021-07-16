import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { UserEntity } from 'src/user/user.entity';
import { createColumnDto } from 'src/dto/column.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createColumn(user: UserEntity, createColumnDto: createColumnDto) {
    try {
      const column = this.columnRepository.create({
        name: createColumnDto.name,
        user: user,
        cards: [],
      });
      await column.save();
      return column.toJson();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string) {
    try {
      return this.columnRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.columnRepository.find();
  }
}
