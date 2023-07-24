import { DataSource } from 'typeorm'
import { Users } from './src/modules/users/entities/Users'
import { Questionnaires } from './src/modules/questionnaires/entities/Questionnaires'
import { QuestionnaireContents } from './src/modules/questionnaires/entities/QuestionnaireContents'
import { QuestionnaireUserResults } from './src/modules/questionnaires/entities/QuestionnaireUserResults'

const entities = [Users, Questionnaires, QuestionnaireContents, QuestionnaireUserResults]
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'futureplay',
  username: 'admin',
  password: 'test1234',
  entities: entities,
  synchronize: false,
  logging: true,
})

export default dataSource
