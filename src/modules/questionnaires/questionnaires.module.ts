import { Module } from '@nestjs/common'
import { QuestionnairesService } from './questionnaires.service'
import { QuestionnairesController } from './questionnaires.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Questionnaires } from './entities/Questionnaires'
import { QuestionnaireContents } from './entities/QuestionnaireContents'
import { QuestionnaireUserResults } from './entities/QuestionnaireUserResults'

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaires, QuestionnaireContents, QuestionnaireUserResults])],
  providers: [QuestionnairesService],
  exports: [QuestionnairesService],
  controllers: [QuestionnairesController],
})
export class QuestionnairesModule {}
