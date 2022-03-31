import { Column, Entity, OneToMany } from 'typeorm';
import { ColumnEntity } from '../column/column.entity';
import { AbstractEntity } from '../common/abstract-entity';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { CardEntity } from '../cards/card.entity';
import { CommentEntity } from '../comments/comment.entity';
import { IsEmail, MinLength } from 'class-validator';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @MinLength(4)
  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @OneToMany((type) => CardEntity, (card) => card.user)
  cards: CardEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password);
  }

  toJson(): Record<string, any>{
    return classToPlain(this);
  }
}
