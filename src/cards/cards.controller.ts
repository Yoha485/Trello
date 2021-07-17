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
import { CardOwnerGuard } from './card-owner.guard';
import { CreateCardDto, GetCardsDto, UpdateCardDto } from './card.dto';
import { CardEntity } from './card.entity';
import { CardService } from './cards.service';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  createCard(
    @User('id') userId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.createCard(userId, createCardDto);
  }

  @Get(':id')
  @UseGuards(CardOwnerGuard)
  getCardById(@Param('id') id: number): Promise<CardEntity> {
    return this.cardService.findCardById(id);
  }

  @Get()
  getAllCards(@Body() getCardsDto: GetCardsDto): Promise<CardEntity[]> {
    return this.cardService.findCardsByColumnId(getCardsDto);
  }

  @Patch(':id')
  updateCard(
    @Param('id') id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: number): Promise<CardEntity> {
    return this.cardService.deleteCard(id);
  }
}
