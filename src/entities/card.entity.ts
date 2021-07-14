import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { ColumnEntity } from './column.entity';

@Entity('cards')
export class CardEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;
}
