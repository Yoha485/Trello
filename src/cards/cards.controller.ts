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
import { CardOwnerGuard } from './card-owner.guard';
import { CreateCardDto, GetCardsDto, UpdateCardDto } from './card.dto';
import { CardEntity } from './card.entity';
import { CardService } from './cards.service';

@ApiBearerAuth('Token')
@ApiTags('Card')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  @ApiCreatedResponse({description: 'Create card'})
  @ApiInternalServerErrorResponse({description: 'Cannot create card'})
  @ApiBody({type: CreateCardDto})
  createCard(
    @User('id') userId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.createCard(userId, createCardDto);
  }

  @Get(':id')
  @UseGuards(CardOwnerGuard)
  @ApiOkResponse({description: 'Get card by id'})
  @ApiNotFoundResponse({description: 'Card not found'})
  getCardById(@Param('id') id: number): Promise<CardEntity> {
    return this.cardService.findCardById(id);
  }

  @Get()
  @ApiOkResponse({description: 'Get all cards in column'})
  @ApiBody({type: GetCardsDto})
  getAllCards(@Body() getCardsDto: GetCardsDto): Promise<CardEntity[]> {
    return this.cardService.findCardsByColumnId(getCardsDto);
  }

  @Patch(':id')
  @UseGuards(CardOwnerGuard)
  @ApiOkResponse({description: 'Update card'})
  @ApiNotFoundResponse({description: 'Card not found'})
  @ApiBody({type: UpdateCardDto})
  updateCard(
    @Param('id') id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  @UseGuards(CardOwnerGuard)
  @ApiOkResponse({description: 'Delete card'})
  @ApiNotFoundResponse({description: 'Card not found'})
  deleteCard(@Param('id') id: number): Promise<CardEntity> {
    return this.cardService.deleteCard(id);
  }
}
