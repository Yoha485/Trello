import {
  Post,
  Controller,
  UseGuards,
  ValidationPipe,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { createColumnDto, UpdateColumnDto } from 'src/column/column.dto';
import { ColumnOwnerGuard } from './column-owner.guard';
import { ColumnService } from './column.service';

@UseGuards(AuthGuard())
@Controller('columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  createColumn(
    @User('id') userId: number,
    @Body(ValidationPipe) createColumnDto: createColumnDto,
  ) {
    return this.columnService.createColumn(userId, createColumnDto);
  }

  @Get()
  getAllColums(@User('id') userId: number) {
    return this.columnService.findColumnsByUserId(userId);
  }

  @Get(':id')
  @UseGuards(ColumnOwnerGuard)
  getColumnById(@Param('id') id: number) {
    return this.columnService.findColumnById(id);
  }

  @Patch(':id')
  @UseGuards(ColumnOwnerGuard)
  updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @Delete(':id')
  @UseGuards(ColumnOwnerGuard)
  deleteColumn(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }
}
