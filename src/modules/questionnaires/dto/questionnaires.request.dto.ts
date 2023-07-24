import { ApiProperty } from '@nestjs/swagger'
import { PageRequest } from 'src/modules/common/common.pageRequest'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateQuestionnaireReqeustDto {
  @ApiProperty({
    example: '타이틀 입력',
    description: 'title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    example: '설명 입력',
    description: 'description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string
}

export class ModifyQuestionnaireReqeustDto {
  @ApiProperty({
    example: 1,
    description: 'questionnaireId',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  questionnaireId!: number

  @ApiProperty({
    example: '타이틀 입력',
    description: 'title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public title: string

  @ApiProperty({
    example: '설명 입력',
    description: 'description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string
}

export class CreateQuestionnaireContentReqeustDto {
  @ApiProperty({
    example: 1,
    description: 'questionnaireId',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  questionnaireId!: number

  @ApiProperty({
    example: '타이틀 입력',
    description: 'title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contentText: string

  @ApiProperty({
    example: 1,
    description: '내성적: 0, 외향적: 1, 분석적: 2, 창의적: 3, 모험적: 4',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  category!: number
}

export class ListQuestionsDto extends PageRequest {
  @ApiProperty({
    example: 1,
    description: 'questionnaireId',
    required: true,
  })
  questionnaireId!: number
}

export class CreateQuestionnaireResultRequestDto {
  @ApiProperty({
    example: 1,
    description: '설문지 결과값',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  score!: number

  @ApiProperty({
    example: 1,
    description: '설문지 내용아이디',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  questionnaireContentId!: number
}

export class ListResultsDto extends PageRequest {
  @ApiProperty({
    example: 1,
    description: 'questionnaireId',
    required: true,
  })
  questionnaireId!: number
  @ApiProperty({
    example: 1,
    description: '유저아이디(관리자용)',
    required: false,
  })
  userId?: number
}
