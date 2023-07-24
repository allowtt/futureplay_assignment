import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FuturePlayEntity } from 'src/modules/common/entities/FuturePlayEntity'
import { ApiProperty } from '@nestjs/swagger'
import { Questionnaires } from './Questionnaires'
import { QuestionnaireUserResults } from './QuestionnaireUserResults'

@Entity()
export class QuestionnaireContents extends FuturePlayEntity {
  @PrimaryGeneratedColumn({ comment: '설문지내용 아이디' })
  readonly questionnaireContentId!: number

  @Column({ type: 'varchar', comment: '질문내용', length: 100 })
  contentText: string

  @Column({ comment: '질문 카테고리' })
  category!: number

  @Column({ comment: '설문지아이디' })
  questionnaireId!: number

  @ApiProperty({ type: () => Questionnaires })
  @ManyToOne(() => Questionnaires, { eager: false, lazy: true })
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire!: Questionnaires

  @ApiProperty({ type: () => QuestionnaireUserResults })
  @OneToMany(() => QuestionnaireUserResults, (entity) => entity.questionnaireContent, {
    nullable: true,
    eager: false,
    lazy: true,
  })
  questionnaireUserResults!: QuestionnaireUserResults[]
}
