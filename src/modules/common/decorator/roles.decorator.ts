import { SetMetadata } from '@nestjs/common'
import { FuturePlayAuthRole } from '../auth/roles.const'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: FuturePlayAuthRole[]) => SetMetadata(ROLES_KEY, roles)
