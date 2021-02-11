import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AppSettings } from './app.settings';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const { host, port, apiPrefix, nodeEnv } = AppSettings.load(app);
    await app.listen(port, host);
    Logger.log(`Application is started on http://${host}:${port}${apiPrefix} in ${nodeEnv} mode`);
}
bootstrap();
