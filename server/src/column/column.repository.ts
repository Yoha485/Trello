import { EntityRepository, Repository } from "typeorm";
import { ColumnEntity } from "./column.entity";


@EntityRepository(ColumnEntity)
export class ColumnRepository extends Repository<ColumnEntity> {}