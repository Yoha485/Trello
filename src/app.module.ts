import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ColumnModule } from './column/column.module';
import { DatabaseConnectionService } from './database-connection.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule,
    UserModule,
    ColumnModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
