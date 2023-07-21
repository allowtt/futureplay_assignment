import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgreSQLOptions } from './config/postgresql'

@Module({
  imports: [TypeOrmModule.forRoot(PostgreSQLOptions)],
})
export class AppModule {}
