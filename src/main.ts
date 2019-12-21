import { AppModule } from '@app/app';
import { NestFactory } from '@nestjs/core';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
};

bootstrap().then();
