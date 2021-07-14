import { Column, Entity, OneToMany } from 'typeorm';
import { ColumnEntity} from './column.entity';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  username: string;

  @OneToMany((type) => ColumnEntity, (column => column.user))
  columns: ColumnEntity[];
}
