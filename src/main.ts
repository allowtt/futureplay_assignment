import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ServerOptions } from './config/server'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import expressBasicAuth from 'express-basic-auth'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    ['/api'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [ServerOptions.SWAGGER_USER]: ServerOptions.SWAGGER_PASSWORD, // 지정된 ID/비밀번호
      },
    })
  )

  const config = new DocumentBuilder()
    .setTitle('FuturePlay API document')
    .setDescription('FuturePlay API description')
    .setVersion('0.1')
    .addTag('FuturePlay')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  const port = ServerOptions.PORT
  await app.listen(port)
}
bootstrap()
