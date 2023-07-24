import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { QuestionnairesService } from './questionnaires.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  CreateQuestionnaireContentReqeustDto,
  CreateQuestionnaireReqeustDto,
  CreateQuestionnaireResultRequestDto,
  ListQuestionsDto,
  ListResultsDto,
  ModifyQuestionnaireReqeustDto,
} from './dto/questionnaires.request.dto'
import { FuturePlayAuthRole } from '../common/auth/roles.const'
import { Roles } from '../common/decorator/roles.decorator'
import { UserInfo } from '../common/decorator/users.decorator'
import { Users } from '../users/entities/Users'

@ApiTags('설문지 API')
@Controller('api/questionnaires')
export class QuestionnairesController {
  constructor(private questionnairesService: QuestionnairesService) {}

  @ApiOperation({ summary: '설문지 생성(관리자)' })
  @Roles(FuturePlayAuthRole.Admin)
  @Post('/create')
  async createQuestionnaire(@Body() data: CreateQuestionnaireReqeustDto) {
    return this.questionnairesService.createQuestionnaire(data)
  }

  @ApiOperation({ summary: '설문지 수정(관리자)' })
  @Roles(FuturePlayAuthRole.Admin)
  @Put('/modify')
  async modifyQuestionnaire(@Body() data: ModifyQuestionnaireReqeustDto) {
    return this.questionnairesService.modifyQuestionnaire(data)
  }

  @ApiOperation({ summary: '설문지 내용(항목)생성(관리자)' })
  @Roles(FuturePlayAuthRole.Admin)
  @Post('/content/create')
  async createQuestionnaireContent(@Body() data: CreateQuestionnaireContentReqeustDto) {
    return this.questionnairesService.createQuestionnaireContent(data)
  }

  @ApiOperation({ summary: '설문지 내용(항목) 다건 조회' })
  // @ApiResponse({ status: 200, type: GetWorkspaceDto })
  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Get('/questions')
  async listableQuestions(@Query() data: ListQuestionsDto) {
    return this.questionnairesService.listableQuestions(data)
  }

  @ApiOperation({ summary: '설문지 내용(항목) 단건 조회' })
  // @ApiResponse({ status: 200, type: GetWorkspaceDto })
  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Get(':questionnaireContentId/question')
  async getQuestion(@Param('questionnaireContentId') questionnaireContentId: number) {
    return this.questionnairesService.getQuestion(questionnaireContentId)
  }

  @ApiOperation({ summary: '설문지 내용(항목) 결과생성' })
  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Post('/result/create')
  async createQuestionnaireResult(@Body() data: CreateQuestionnaireResultRequestDto, @UserInfo() user: Users) {
    return this.questionnairesService.createQuestionnaireResult(data, user)
  }

  @ApiOperation({ summary: '설문지 내용 결과 다건 조회' })
  // @ApiResponse({ status: 200, type: GetWorkspaceDto })
  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Get('/questions/result')
  async listableResults(@Query() data: ListResultsDto, @UserInfo() user: Users) {
    return this.questionnairesService.listableResults(data, user)
  }

  @ApiOperation({ summary: '설문지 내용 결과 단건 조회' })
  // @ApiResponse({ status: 200, type: GetWorkspaceDto })
  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Get(':questionnaireUserResultId/question/result')
  async getResult(@Param('questionnaireUserResultId') questionnaireUserResultId: number) {
    return this.questionnairesService.getResult(questionnaireUserResultId)
  }
}
