import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/abstract-entity';
import { CardEntity } from '../cards/card.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  comment: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne((type) => CardEntity, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: CardEntity;
}
