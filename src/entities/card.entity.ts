import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { ColumnEntity } from './column.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity('cards')
export class CardEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => CommentEntity, comment => comment.card)
  comments: CommentEntity[];

  @ManyToOne((type) => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @ManyToOne((type) => UserEntity, (user) => user.cards, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
