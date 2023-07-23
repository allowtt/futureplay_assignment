import { Body, Controller, Post, Response } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JoinRequestDto, LoginRequestDto } from './dto/users.request.dto'
import { Roles } from '../common/decorator/roles.decorator'
import { FuturePlayAuthRole, JWT_NAME } from '../common/auth/roles.const'
import { UserInfo } from '../common/decorator/users.decorator'
import { Users } from './entities/Users'

@ApiTags('유저 API')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '유저 회원가입' })
  @Post('/signup')
  async registerUser(@Body() data: JoinRequestDto) {
    return this.usersService.registerUser(data, false)
  }

  @ApiOperation({ summary: '유저 회원가입(어드민)' })
  @Post('/admin/signup')
  async registerAdmin(@Body() data: JoinRequestDto) {
    return this.usersService.registerUser(data, true)
  }

  @Post('login')
  async login(@Body() data: LoginRequestDto, @Response() res) {
    console.log(`login 시작`)
    const result = await this.usersService.loginUser(data)
    const keyName = result.keyName
    const jwtToken = result.token
    res.cookie(keyName, jwtToken, { signed: true })
    res.set(keyName, jwtToken)

    return res.send(result)
  }

  @Roles(FuturePlayAuthRole.User, FuturePlayAuthRole.Admin)
  @Post('authtest')
  async authtest(@Response() res, @UserInfo() userInfo: Users) {
    console.log(`${JSON.stringify(userInfo)}`)
    const keyName = JWT_NAME[FuturePlayAuthRole.User]
    res.cookie(keyName, '', { signed: true })
    return res.send({ ok: 1 })
  }
}
