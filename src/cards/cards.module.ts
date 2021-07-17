import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { CardEntity } from './card.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
