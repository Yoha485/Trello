import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/entities/column.entity';
import { UserEntity } from 'src/entities/user.entity';
import { createColumnDto } from 'src/model/column.model';
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
      return await this.columnRepository.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return this.columnRepository.find();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
