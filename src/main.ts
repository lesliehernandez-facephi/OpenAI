import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvService } from './modules/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { snapshot: true });


  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  app.useGlobalPipes(new ValidationPipe())

  const configSwagger = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.1')
    .build();

  const documen = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documen)


  await app.listen(port);
  
}
bootstrap();
