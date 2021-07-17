import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentDto,
  GetCommentsDto,
  UpdateCommentDto,
} from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(userId: number, createCommentDto: CreateCommentDto) {
    try {
      return await this.commentRepository.save({
        userId,
        ...createCommentDto,
      });
    } catch (err) {
      throw new NotFoundException('Column Not Found');
    }
  }

  async findCommentById(id: number) {
    return this.commentRepository.findOne(id);
  }

  async getCommentsByCardId(getCommentsDto: GetCommentsDto) {
    const { cardId } = getCommentsDto;
    return this.commentRepository.find({ where: { cardId } });
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOneOrFail(id);
      return this.commentRepository.save({ ...comment, ...updateCommentDto });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteComment(id: number) {
    try {
      const comment = await this.commentRepository.findOneOrFail(id);
      await this.commentRepository.delete(comment);
      return comment;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
