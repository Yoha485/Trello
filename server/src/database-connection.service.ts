import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: 'ec2-176-34-211-0.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'gikrxderadbokv',
      password: '12cd870d60a55015e0e64b2743c188ce4437fb7506e752b40c767d12cd79659f',
      database: 'dac9tndfmn4tmg',
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: ['dist/**/*.entity.js'],
    };
  }
}
