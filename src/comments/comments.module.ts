import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
