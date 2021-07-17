import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { CardService } from "./cards.service";

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const card = await this.cardService.findCardById(request.params.id);
    if(!card){
      throw new NotFoundException();
    }
    return card.userId === user.id;
  }
}