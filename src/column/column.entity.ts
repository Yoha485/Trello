import { classToPlain } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/abstract-entity';
import { CardEntity } from '../cards/card.entity';
import { UserEntity } from '../user/user.entity';

@Entity('columns')
export class ColumnEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.columns, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @OneToMany((type) => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
