import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { ColumnController } from './column.controller';
import { ColumnRepository } from './column.repository';
import { ColumnService } from './column.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, ColumnRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
})
export class ColumnModule {}
