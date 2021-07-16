import {
  Post,
  Controller,
  UseGuards,
  ValidationPipe,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { createColumnDto } from 'src/model/column.model';
import { ColumnAuthGuard } from './column.guard';
import { ColumnService } from './column.service';

@Controller('columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  @UseGuards(AuthGuard())
  createColumn(
    @User() user: UserEntity,
    @Body(ValidationPipe) createColumnDto: createColumnDto,
  ) {
    return this.columnService.createColumn(user, createColumnDto);
  }

  @Get(':id')
  @UseGuards(ColumnAuthGuard)
  getColumnById(@Param('id') id: string, @User() user: UserEntity) {
    return 'done';
  }
}
