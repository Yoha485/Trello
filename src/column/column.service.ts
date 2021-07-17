import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateColumnDto, UpdateColumnDto } from 'src/column/column.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createColumn(userId: number, createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    try {
      const column = this.columnRepository.create({
        ...createColumnDto,
        userId,
      });
      await column.save();
      return column;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findColumnById(id: number): Promise<ColumnEntity> {
    try {
      return this.columnRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findColumnsByUserId(userId: number): Promise<ColumnEntity[]> {
    return this.columnRepository.find({ where: { userId } });
  }

  async updateColumn(id: number, updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    try {
      const column = await this.columnRepository.findOneOrFail(id);
      return this.userRepository.save({ ...column, ...updateColumnDto });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteColumn(id: number): Promise<ColumnEntity> {
    try {
      const column = await this.columnRepository.findOneOrFail(id);
      await this.columnRepository.delete(column);
      return column;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
