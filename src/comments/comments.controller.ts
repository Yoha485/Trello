import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { CommentOwnerGuard } from './comment-owner.guard';
import {
  CreateCommentDto,
  GetCommentsDto,
  UpdateCommentDto,
} from './comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comments.service';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(
    @User('id') userId,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.createComment(userId, createCommentDto);
  }

  @Get(':id')
  @UseGuards(CommentOwnerGuard)
  getCommentById(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.findCommentById(id);
  }

  @Get()
  getAllComments(@Body() getCommentsDto: GetCommentsDto): Promise<CommentEntity[]> {
    return this.commentService.getCommentsByCardId(getCommentsDto);
  }

  @Patch(':id')
  @UseGuards(CommentOwnerGuard)
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(CommentOwnerGuard)
  deleteComment(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.deleteComment(id);
  }
}
