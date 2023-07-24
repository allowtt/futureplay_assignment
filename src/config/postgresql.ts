import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { QuestionnaireContents } from 'src/modules/questionnaires/entities/QuestionnaireContents'
import { QuestionnaireUserResults } from 'src/modules/questionnaires/entities/QuestionnaireUserResults'
import { Questionnaires } from 'src/modules/questionnaires/entities/Questionnaires'
import { Users } from 'src/modules/users/entities/Users'

const entities = [Users, Questionnaires, QuestionnaireContents, QuestionnaireUserResults]
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
