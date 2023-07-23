import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return { user: request.user, userId: request.userId }
})