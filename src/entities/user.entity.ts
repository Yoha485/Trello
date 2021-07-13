import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";

@Entity()
export class UserEntity extends AbstractEntity{
  @Column()
  email: string;

  @Column()
  username: string;
  
}