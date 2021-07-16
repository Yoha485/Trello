import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColumnService } from './column.service';

export class ColumnAuthGuard extends AuthGuard('jwt') {
  constructor(private columnService: ColumnService) {
    super();
  }

  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   console.log(request.params);
  //   return true;
  // }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    this.columnService.findById(request.params.id).then((column) => {
      if (column.id !== user.id) {
        throw new BadRequestException();
      }
    });;
    return user;
  }
}
