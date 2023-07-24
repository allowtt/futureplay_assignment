import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Users } from '../../modules/users/entities/Users'
import { Utils } from '../../modules/common/utils'
import { Questionnaires } from '../../modules/questionnaires/entities/Questionnaires'
import { QuestionnaireContents } from '../../modules/questionnaires/entities/QuestionnaireContents'
import { QuestionnaireUserResults } from '../../modules/questionnaires/entities/QuestionnaireUserResults'
import { QUESTIONNAIRE_CATEGORY } from '../../modules/questionnaires/questionnaires.const'

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const usersRepository = dataSource.getRepository(Users)
    const questionnairesRepository = dataSource.getRepository(Questionnaires)
    const questionnaireContentsRepository = dataSource.getRepository(QuestionnaireContents)
    const questionnaireUserResultsRepository = dataSource.getRepository(QuestionnaireUserResults)
    await questionnaireUserResultsRepository.delete({})
    await questionnaireContentsRepository.delete({})
    await questionnairesRepository.delete({})
    await usersRepository.delete({})

    const hashedPassword = await Utils.genSaltedPassword('test1234')
    await usersRepository.insert([
      {
        email: 'test1@gmail.com',
        name: 'test사용자',
        password: hashedPassword,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
        lastLoginToken: Utils.getNowDateToken(),
        lastAccessTime: Utils.getNowDate(),
      },
      {
        email: 'admin@gmail.com',
        name: '어드민테스트용',
        password: hashedPassword,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
        lastLoginToken: Utils.getNowDateToken(),
        lastAccessTime: Utils.getNowDate(),
        role: 0,
      },
    ])

    await questionnairesRepository.delete({})
    const questionnaire = await questionnairesRepository.save({
      title: 'test타이틀',
      description: '설명',
      createdAt: Utils.getNowDate(),
      updatedAt: Utils.getNowDate(),
    })

    await questionnaireContentsRepository.insert([
      {
        questionnaireId: questionnaire.questionnaireId,
        contentText: '나는 혼자 시간을 보내는 것을 즐깁니다.',
        category: QUESTIONNAIRE_CATEGORY.Adventurous,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      },
      {
        questionnaireId: questionnaire.questionnaireId,
        contentText: '나는 혼자보다는 팀에서 일하는 것을 선호합니다.',
        category: QUESTIONNAIRE_CATEGORY.Adventurous,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      },
      {
        questionnaireId: questionnaire.questionnaireId,
        contentText: '새로운 경험에 열려 있으며 새로운 것을 시도하는 것을 즐깁니다.',
        category: QUESTIONNAIRE_CATEGORY.Adventurous,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      },
      {
        questionnaireId: questionnaire.questionnaireId,
        contentText: '나는 매우 체계적이고 구조화된 환경을 선호합니다.',
        category: QUESTIONNAIRE_CATEGORY.Adventurous,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      },
      {
        questionnaireId: questionnaire.questionnaireId,
        contentText: '복잡한 문제를 분석하고 논리적인 해결책을 찾는 것을 즐깁니다.',
        category: QUESTIONNAIRE_CATEGORY.Adventurous,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      },
    ])

    const { userId } = await usersRepository.findOneOrFail({ where: { role: 1 } })
    console.log(userId)

    const questionnaireContents = await questionnaireContentsRepository.find({})
    console.log(questionnaireContents)
    for (const questionnaireContent of questionnaireContents) {
      await questionnaireUserResultsRepository.insert({
        questionnaireContentId: questionnaireContent.questionnaireContentId,
        score: 3,
        userId,
        createdAt: Utils.getNowDate(),
        updatedAt: Utils.getNowDate(),
      })
    }
  }
}
