import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './entities/Users'
import { JoinRequestDto, LoginRequestDto } from './dto/users.request.dto'
import { Utils } from 'src/modules/common/utils'
import { ErrorMap } from 'src/modules/common/errors'
import { FuturePlayAuthRole, JWT_NAME } from '../common/auth/roles.const'
import { USER_ROLE } from './users.const'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

  async registerUser(data: JoinRequestDto, isAdmin: boolean) {
    const { name, email } = data

    const user: Users = await this.usersRepository.findOneOrFail({ where: { email } }).catch(() => null)

    if (user) {
      Utils.ensure(false, ErrorMap.DuplicateUser)
    }

    const hashedPassword = await Utils.genSaltedPassword(data.password)

    const _user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    if (isAdmin) {
      _user.role = USER_ROLE.admin
    }
    const { password, ...userWithoutPassword } = await this.usersRepository.save(_user)

    return userWithoutPassword
  }

  async loginUser(data: LoginRequestDto) {
    const { email } = data
    const user: Users = await this.usersRepository.findOneOrFail({ where: { email } }).catch(() => null)
    Utils.ensure(user, ErrorMap.WrongLoginInfo)

    const chkPassword = await Utils.checkSaltedPassword(data.password, user.password.toString())
    Utils.ensure(chkPassword, ErrorMap.NotMatchPassword)

    const tokenData = { id: user.userId, role: user.role, ts: Utils.getNowDate().getTime() }
    const jwtToken = await Utils.signJWT(tokenData, '1234')

    let keyName: string
    if (user.role === USER_ROLE.admin) {
      keyName = JWT_NAME[FuturePlayAuthRole.Admin]
    } else {
      keyName = JWT_NAME[FuturePlayAuthRole.User]
    }

    const { password, ...userRestProperties } = await this.usersRepository.findOneOrFail({
      where: { userId: user.userId },
    })

    const result = { message: 'success', keyName, token: jwtToken, me: userRestProperties }
    return result
  }
}
