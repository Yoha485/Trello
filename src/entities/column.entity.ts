import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CardEntity } from './card.entity';
import { UserEntity } from './user.entity';

@Entity('columns')
export class ColumnEntity extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.columns, {onDelete: 'CASCADE'})
  user: UserEntity;

  @OneToMany((type) => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
