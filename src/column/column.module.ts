import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ColumnEntity } from "src/entities/column.entity";
import { UserEntity } from "src/entities/user.entity";
import { ColumnController } from "./columl.controller";
import { ColumnService } from "./column.service";


@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, UserEntity]), AuthModule],
  providers: [ColumnService],
  controllers: [ColumnController],
})
export class ColumnModule {}