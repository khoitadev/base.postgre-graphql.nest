import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { AppModule } from '~/app.module';
// import { AllExceptionsFilter } from '~/exception/all.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  const PORT: number | string = process.env.PORT || 3000;
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  await app.listen(PORT);
  console.log('Nestjs listening port: ', PORT);
}
bootstrap();
