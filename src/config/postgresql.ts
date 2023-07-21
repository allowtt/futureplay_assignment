import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Users } from 'src/modules/user/entities/Users'

const entities = [Users]
export const PostgreSQLOptions: TypeOrmModuleOptions = (function (): TypeOrmModuleOptions {
  switch (process.env.ENV) {
    default:
      return {
        type: 'postgres',
        database: 'futureplay',
        username: 'admin',
        password: 'test1234',
        port: 5432,
        host: 'localhost',
        // entities: [__dirname + '/modules/**/entities/*{.ts,.js}'],
        entities: entities,
        logging: false,
        cache: true,
        dropSchema: process.env.NODE_ENV === 'test',
        synchronize: true,
      }
  }
})()
