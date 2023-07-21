import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgreSQLOptions } from './config/postgresql'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [TypeOrmModule.forRoot(PostgreSQLOptions), UsersModule],
})
export class AppModule {}
