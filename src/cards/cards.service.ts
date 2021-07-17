import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto, GetCardsDto, UpdateCardDto } from './card.dto';
import { CardEntity } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async createCard(userId: number, createCardDto: CreateCardDto) {
    try {
      return await this.cardRepository.save({
        userId,
        ...createCardDto,
      });
    } catch (err) {
      throw new NotFoundException('Column Not Found');
    }
  }

  async findCardsByColumnId(getCardsDto: GetCardsDto) {
    const { columnId } = getCardsDto;
    return this.cardRepository.find({ where: { columnId } });
  }

  async findCardById(id: number) {
    return this.cardRepository.findOne(id);
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto) {
    try {
      const card = await this.cardRepository.findOneOrFail(id);
      return this.cardRepository.save({ ...card, ...updateCardDto });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteCard(id: number) {
    try {
      const card = await this.cardRepository.findOneOrFail(id);
      await this.cardRepository.delete(card);
      return card;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
