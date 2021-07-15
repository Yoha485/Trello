import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { AbstractEntity } from './abstract-entity';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { CardEntity } from './card.entity';
import { CommentEntity } from './comment.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @OneToMany((type) => CardEntity, (card) => card.user)
  cards: CardEntity[];

  @OneToMany(type => CommentEntity, comment => comment.user)
  comments: CommentEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJson() {
    return classToPlain(this);
  }
}
