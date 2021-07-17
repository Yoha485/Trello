import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { UserEntity } from 'src/user/user.entity';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
})
export class ColumnModule {}
