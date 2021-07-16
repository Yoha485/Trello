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
import { User } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { createColumnDto } from 'src/dto/column.dto';
import { ColumnAuthGuard } from './column.guard';
import { ColumnService } from './column.service';

@UseGuards(AuthGuard())
@Controller('columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  createColumn(
    @User() user: UserEntity,
    @Body(ValidationPipe) createColumnDto: createColumnDto,
  ) {
    return this.columnService.createColumn(user, createColumnDto);
  }

  @Get(':id')
  @UseGuards(ColumnAuthGuard)
  getColumnById(@Param('id') id: string) {
    return this.columnService.findById(id);
  }
}
