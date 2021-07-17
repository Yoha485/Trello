import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async createCard(userId: number, createCardDto: CreateCardDto): Promise<CardEntity> {
    try {
      return await this.cardRepository.save({
        userId,
        ...createCardDto,
      });
    } catch (err) {
      throw new InternalServerErrorException('Cannot create card');
    }
  }

  async findCardsByColumnId(getCardsDto: GetCardsDto): Promise<CardEntity[]> {
    const { columnId } = getCardsDto;
    return this.cardRepository.find({ where: { columnId } });
  }

  async findCardById(id: number): Promise<CardEntity> {
    try{
      return this.cardRepository.findOne(id);
    } catch(err){
      throw new NotFoundException();
    }
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto): Promise<CardEntity> {
    try {
      const card = await this.cardRepository.findOneOrFail(id);
      return this.cardRepository.save({ ...card, ...updateCardDto });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async deleteCard(id: number): Promise<CardEntity> {
    try {
      const card = await this.cardRepository.findOneOrFail(id);
      await this.cardRepository.delete(card);
      return card;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
