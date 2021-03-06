import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentDto,
  GetCommentsDto,
  UpdateCommentDto,
} from './comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    try {
      return await this.commentRepository.save({
        userId,
        ...createCommentDto,
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findCommentById(id: number): Promise<CommentEntity> {
    try {
      return this.commentRepository.findOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getCommentsByCardId(
    getCommentsDto: GetCommentsDto,
  ): Promise<CommentEntity[]> {
    const { cardId } = getCommentsDto;
    return this.commentRepository.find({ where: { cardId } });
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.findOneOrFail(id);
      return this.commentRepository.save({ ...comment, ...updateCommentDto });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteComment(id: number): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.findOneOrFail(id);
      await this.commentRepository.delete(comment);
      return comment;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
