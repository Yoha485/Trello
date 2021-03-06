import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ColumnService } from './column.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private readonly columnService: ColumnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const column = await this.columnService.findColumnById(request.params.id);
    if(!column){
      throw new NotFoundException();
    }
    return column.userId === user.id;
  }
}
