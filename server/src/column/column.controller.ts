import {
  Post,
  Controller,
  UseGuards,
  ValidationPipe,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { CreateColumnDto, UpdateColumnDto } from 'src/column/column.dto';
import { ColumnOwnerGuard } from './column-owner.guard';
import { ColumnService } from './column.service';
import { ColumnEntity } from './column.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiBearerAuth('Token')
@ApiTags('Column')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@UseGuards(AuthGuard())
@Controller('columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  @ApiCreatedResponse({description: 'Create column'})
  @ApiInternalServerErrorResponse({description: 'Cannot create column'})
  @ApiBody({type: CreateColumnDto})
  createColumn(
    @User('id') userId: number,
    @Body(ValidationPipe) createColumnDto: CreateColumnDto,
  ): Promise<ColumnEntity> {
    
    return this.columnService.createColumn(userId, createColumnDto);
  }

  @Get()
  @ApiOkResponse({description: 'Get all columns by user'})
  getAllColums(@User('id') userId: number): Promise<ColumnEntity[]> {
    return this.columnService.findColumnsByUserId(userId);
  }

  @Get(':id')
  @UseGuards(ColumnOwnerGuard)
  @ApiOkResponse({description: 'Get column by id'})
  @ApiNotFoundResponse({description: 'Column not found'})
  getColumnById(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnService.findColumnById(id);
  }

  @Patch(':id')
  @UseGuards(ColumnOwnerGuard)
  @ApiOkResponse({description: 'Update column'})
  @ApiNotFoundResponse({description: 'Column not found'})
  @ApiBody({type: UpdateColumnDto})
  updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnEntity> {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @Delete(':id')
  @UseGuards(ColumnOwnerGuard)
  @ApiOkResponse({description: 'Delete column'})
  @ApiNotFoundResponse({description: 'Column not found'})
  deleteColumn(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnService.deleteColumn(id);
  }
}
