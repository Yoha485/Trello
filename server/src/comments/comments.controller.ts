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
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { CommentOwnerGuard } from './comment-owner.guard';
import {
  CreateCommentDto,
  GetCommentsDto,
  UpdateCommentDto,
} from './comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comments.service';

@ApiBearerAuth('Token')
@ApiTags('Comment')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiCreatedResponse({description: 'Create comment'})
  @ApiInternalServerErrorResponse({description: 'Cannot create comment'})
  @ApiBody({type: CreateCommentDto})
  createComment(
    @User('id') userId,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.createComment(userId, createCommentDto);
  }

  @Get(':id')
  @UseGuards(CommentOwnerGuard)
  @ApiOkResponse({description: 'Get comment by id'})
  @ApiNotFoundResponse({description: 'Comment not Found'})
  getCommentById(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.findCommentById(id);
  }

  @Get()
  @ApiOkResponse({description: 'Get all comments in card'})
  @ApiBody({type: GetCommentsDto})
  getAllComments(@Body() getCommentsDto: GetCommentsDto): Promise<CommentEntity[]> {
    return this.commentService.getCommentsByCardId(getCommentsDto);
  }

  @Patch(':id')
  @UseGuards(CommentOwnerGuard)
  @ApiOkResponse({description: 'Update comment'})
  @ApiNotFoundResponse({description: 'Comment not found'})
  @ApiBody({type: UpdateCommentDto})
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(CommentOwnerGuard)
  @ApiOkResponse({description: 'Delete comment'})
  @ApiNotFoundResponse({description: 'Comment not found'})
  deleteComment(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.deleteComment(id);
  }
}
