import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Utils } from 'src/modules/common/utils'
import { ErrorMap } from 'src/modules/common/errors'
import {
  CreateQuestionnaireContentReqeustDto,
  CreateQuestionnaireReqeustDto,
  CreateQuestionnaireResultRequestDto,
  ListQuestionsDto,
  ListResultsDto,
  ModifyQuestionnaireReqeustDto,
} from './dto/questionnaires.request.dto'
import { Questionnaires } from './entities/Questionnaires'
import { QuestionnaireContents } from './entities/QuestionnaireContents'
import { ListableOutput } from '../common/common.pageResponse'
import { Users } from '../users/entities/Users'
import { QuestionnaireUserResults } from './entities/QuestionnaireUserResults'
import { USER_ROLE } from '../users/users.const'
import { PageRequest } from '../common/common.pageRequest'

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Questionnaires) private readonly questionnairesRepository: Repository<Questionnaires>,
    @InjectRepository(QuestionnaireContents)
    private readonly questionnaireContentsRepository: Repository<QuestionnaireContents>,
    @InjectRepository(QuestionnaireUserResults)
    private readonly questionnaireUserResultsRepository: Repository<QuestionnaireUserResults>
  ) {}

  async createQuestionnaire(data: CreateQuestionnaireReqeustDto) {
    const { title, description } = data

    const questionnaire = await this.questionnairesRepository.findOneOrFail({ where: { title } }).catch(() => null)
    Utils.ensure(!questionnaire, ErrorMap.DuplicateQuestionnaireTitle)
    const _questionnaire = this.questionnairesRepository.create({
      title,
      description,
    })

    const result = await this.questionnairesRepository.save(_questionnaire)

    return result
  }

  async modifyQuestionnaire(data: ModifyQuestionnaireReqeustDto) {
    const { questionnaireId, title, description } = data

    const questionnaire = await this.questionnairesRepository
      .findOneOrFail({ where: { questionnaireId } })
      .catch(() => null)

    Utils.ensure(questionnaire, ErrorMap.NotFoundQuestionnaire)

    if (title !== questionnaire.title) {
      const duplTitle = await this.questionnairesRepository.findOneOrFail({ where: { title } }).catch(() => null)
      Utils.ensure(!duplTitle, ErrorMap.DuplicateQuestionnaireTitle)
    }
    await this.questionnairesRepository.update({ questionnaireId }, { title, description })

    return this.questionnairesRepository.findOneOrFail({ where: { questionnaireId } })
  }

  async createQuestionnaireContent(data: CreateQuestionnaireContentReqeustDto) {
    const { questionnaireId, category, contentText } = data

    const questionnaire = await this.questionnairesRepository
      .findOneOrFail({ where: { questionnaireId } })
      .catch(() => null)

    Utils.ensure(questionnaire, ErrorMap.NotFoundQuestionnaire)

    const _questionnaireContent = this.questionnaireContentsRepository.create({
      questionnaireId,
      category,
      contentText,
    })

    const result = await this.questionnaireContentsRepository.save(_questionnaireContent)

    return result
  }

  async listableQuestionnaires(data: PageRequest) {
    const qb = this.questionnairesRepository.createQueryBuilder('q').orderBy('q.questionnaireId', 'DESC')

    const listResult = await ListableOutput(qb, data)
    return listResult
  }
  async getQuestion(questionnaireContentId: number) {
    const qb: QuestionnaireContents = await this.questionnaireContentsRepository
      .createQueryBuilder('qc')
      .where('qc.questionnaireContentId = :questionnaireContentId', { questionnaireContentId })
      .getOneOrFail()
    return qb
  }

  async listableQuestions(data: ListQuestionsDto) {
    const qb = this.questionnaireContentsRepository
      .createQueryBuilder('qc')
      .where('qc.questionnaireId = :questionnaireId', { questionnaireId: data.questionnaireId })
      .orderBy('qc.questionnaireContentId', 'ASC')

    const listResult = await ListableOutput(qb, data)
    return listResult
  }

  async createQuestionnaireResult(data: CreateQuestionnaireResultRequestDto, user: Users) {
    const { score, questionnaireContentId } = data

    const questionnaireContent = await this.questionnaireContentsRepository
      .findOneOrFail({ where: { questionnaireContentId } })
      .catch(() => null)

    Utils.ensure(questionnaireContent, ErrorMap.NotFoundQuestionnaireContent)

    const questionnaireUserResult = await this.questionnaireUserResultsRepository
      .findOneOrFail({ where: { questionnaireContentId, userId: user.userId } })
      .catch(() => null)

    Utils.ensure(!questionnaireUserResult, ErrorMap.DuplicateQuestionnaireUserResult)
    const _questionnaireUserResult = this.questionnaireUserResultsRepository.create({
      questionnaireContentId,
      score,
      userId: user.userId,
    })

    const result = await this.questionnaireUserResultsRepository.save(_questionnaireUserResult)

    return result
  }

  async getResult(questionnaireUserResultId: number) {
    const qb: QuestionnaireUserResults = await this.questionnaireUserResultsRepository
      .createQueryBuilder('qr')
      .leftJoinAndSelect('qr.questionnaireContent', 'qc')
      .where('qr.questionnaireUserResultId = :questionnaireUserResultId', { questionnaireUserResultId })
      .getOneOrFail()
    return qb
  }

  async listableResults(data: ListResultsDto, user: Users) {
    let userId: number
    if (user.role == USER_ROLE.admin && data.userId) {
      userId = data.userId
    } else {
      console.log(`user: ${JSON.stringify(user)}`)
      userId = user.userId
    }
    const qb = this.questionnaireUserResultsRepository
      .createQueryBuilder('qr')
      .leftJoinAndSelect('qr.questionnaireContent', 'qc')
      .where('qc.questionnaireId = :questionnaireId', { questionnaireId: data.questionnaireId })
      .andWhere('qr.userId = :userId', { userId })
      .orderBy('qc.questionnaireContentId', 'ASC')

    const listResult = await ListableOutput(qb, data)
    return listResult
  }
}
