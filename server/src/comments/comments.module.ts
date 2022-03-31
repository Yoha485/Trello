import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
