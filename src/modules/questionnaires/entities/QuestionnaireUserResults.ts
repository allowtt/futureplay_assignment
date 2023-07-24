import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FuturePlayEntity } from '../../common/entities/FuturePlayEntity'
import { Users } from '../../users/entities/Users'
import { QuestionnaireContents } from './QuestionnaireContents'

@Entity()
export class QuestionnaireUserResults extends FuturePlayEntity {
  @PrimaryGeneratedColumn({ comment: '설문 답변 아이디' })
  readonly questionnaireUserResultId!: number

  @Column({ comment: '답변 점수' })
  score!: number

  @Column({ comment: '유저아이디' })
  userId!: number

  @ManyToOne(() => Users, { eager: false, lazy: true })
  @JoinColumn({ name: 'userId' })
  user!: Users

  @Column({ comment: '설문지 내용아이디' })
  questionnaireContentId!: number

  @ManyToOne(() => QuestionnaireContents, { eager: false, lazy: true })
  @JoinColumn({ name: 'questionnaireContentId' })
  questionnaireContent!: QuestionnaireContents
}
