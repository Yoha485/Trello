import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CardRepository } from './card.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
