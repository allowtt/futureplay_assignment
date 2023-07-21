import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './entities/Users'
import { JoinRequestDto } from './dto/users.request.dto'
import { Utils } from 'src/common/utils'
import { ErrorMap } from 'src/common/errors'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

  async registerUser(data: JoinRequestDto) {
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
    const { password, ...userWithoutPassword } = await this.usersRepository.save(_user)

    return userWithoutPassword
  }
}
