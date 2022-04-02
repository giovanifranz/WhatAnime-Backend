import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
    preflightContinue: false,
    optionsSuccessStatus: 200
  })

  app.useLogger(app.get(Logger))

  const config = new DocumentBuilder()
    .setTitle('Whatanime BFF')
    .setDescription('Whatanime BFF')
    .setVersion('1.0')
    .addTag('whatanime')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 5000)
}
bootstrap()
