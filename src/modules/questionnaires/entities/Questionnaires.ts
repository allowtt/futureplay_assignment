import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FuturePlayEntity } from 'src/modules/common/entities/FuturePlayEntity'
import { QuestionnaireContents } from './QuestionnaireContents'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Questionnaires extends FuturePlayEntity {
  @PrimaryGeneratedColumn({ comment: '설문지 아이디' })
  readonly questionnaireId!: number

  @Column({ type: 'varchar', comment: '타이틀', length: 50 })
  title: string

  @Column({ type: 'varchar', comment: '설명', length: 200 })
  description!: string

  @ApiProperty({ type: () => QuestionnaireContents })
  @OneToMany(() => QuestionnaireContents, (entity) => entity.questionnaire, {
    nullable: true,
    eager: false,
    lazy: true,
  })
  questionnaireContents!: QuestionnaireContents[]
}
