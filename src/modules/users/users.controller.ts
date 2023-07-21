import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JoinRequestDto } from './dto/users.request.dto'

@ApiTags('유저 API')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '유저 회원가입' })
  @Post('/signup')
  async registerUser(@Body() data: JoinRequestDto) {
    return this.usersService.registerUser(data)
  }
}
