import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CardEntity } from './card.entity';
import { UserEntity } from './user.entity';

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
