import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgreSQLOptions } from './config/postgresql'
import { UsersModule } from './modules/users/users.module'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { RolesGuard } from './modules/common/auth/roles.guard'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { QuestionnairesModule } from './modules/questionnaires/questionnaires.module'
import { CustomValidationPipe } from './modules/common/common.validation'

@Module({
  imports: [TypeOrmModule.forRoot(PostgreSQLOptions), UsersModule, QuestionnairesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
