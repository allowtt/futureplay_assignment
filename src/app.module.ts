import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgreSQLOptions } from './config/postgresql'
import { UsersModule } from './modules/users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './modules/common/auth/roles.guard'

@Module({
  imports: [TypeOrmModule.forRoot(PostgreSQLOptions), UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
