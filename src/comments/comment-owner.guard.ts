import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { CommentService } from "./comments.service";


@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const comment = await this.commentService.findCommentById(request.params.id);
    if(!comment){
      throw new NotFoundException();
    }
    return comment.userId === user.id;
  }
}