import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgreSQLOptions } from './config/postgresql'
import { UsersModule } from './modules/users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './modules/common/auth/roles.guard'
import { LoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  imports: [TypeOrmModule.forRoot(PostgreSQLOptions), UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
