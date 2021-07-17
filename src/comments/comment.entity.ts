import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/abstract-entity';
import { CardEntity } from '../cards/card.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  comment: string;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @Column()
  cardId: number;

  @ManyToOne((type) => CardEntity, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'cardId'})
  card: CardEntity;
}
