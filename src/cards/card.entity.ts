import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../common/abstract-entity';
import { ColumnEntity } from '../column/column.entity';
import { CommentEntity } from '../comments/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity('cards')
export class CardEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => CommentEntity, comment => comment.card)
  comments: CommentEntity[];

  @Column()
  columnId: number;

  @ManyToOne((type) => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'columnId'})
  column: ColumnEntity;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'userId'})
  user: UserEntity;
}
