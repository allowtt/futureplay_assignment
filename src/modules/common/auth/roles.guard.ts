import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import Moment from 'moment'
import { ServerOptions } from '../../../config/server'
import { DataSource } from 'typeorm'
import { FuturePlayAuthRole, JWT_EXPIRE, JWT_NAME } from './roles.const'
import { Utils } from '../utils'
import { ErrorMap } from '../errors'
import { Users } from 'src/modules/users/entities/Users'

export interface LoginToken {
  id: number
  role: string
  ts: number
}

async function parseJWT(request: Request, role: FuturePlayAuthRole): Promise<LoginToken> {
  const tokenKeyName = JWT_NAME[role]
  const jwt = request.get(tokenKeyName) || request.signedCookies[tokenKeyName]
  const token = (await Utils.verifyJWT(jwt as string, ServerOptions.JwtSecret)) as LoginToken
  const { ts } = token
  const expireAfter = JWT_EXPIRE[role]
  const expireTime = Moment(ts).add(expireAfter, 'second')

  if (expireTime.isBefore(Utils.getNowMoment())) {
    Utils.ensure(false, ErrorMap.NoPrivilege)
  }

  return token
}

export interface EncryptedTempAuthToken {
  tempAuthId: number
  secret: string
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<FuturePlayAuthRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    let hasMatch = false
    const loginToken = Utils.getNowDateToken()

    try {
      let userId: number
      if (roles.includes(FuturePlayAuthRole.Admin)) {
        try {
          userId = (await parseJWT(request, FuturePlayAuthRole.Admin)).id
        } catch {
          userId = null
        }
      }
      if (roles.includes(FuturePlayAuthRole.User) && !userId) {
        try {
          userId = (await parseJWT(request, FuturePlayAuthRole.User)).id
        } catch {
          userId = null
        }
      }
      Utils.ensure(userId, ErrorMap.NoPrivilege)
      const repo = this.dataSource.getRepository(Users)
      const user = await repo.findOneOrFail({ where: { userId } })
      user.updateLastAccessTime()
      if (user.lastLoginToken !== loginToken) {
        user.updateLastLoginToken()
      }
      await repo.save(user)

      request.user = user
      request.userId = userId

      hasMatch = true
    } catch (error) {
      hasMatch = false
    }
    // }

    if (!hasMatch && roles.length > 0) {
      Utils.ensure(false, ErrorMap.NoPrivilege)
    }

    return true
  }
}
