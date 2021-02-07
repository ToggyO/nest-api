import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { HttpStatusCodeInterceptor } from 'common/api/interceptors';
import { TransformHttpExceptionFilter } from 'common/api/filters';
import { PipeExceptionFactories } from 'common/api/pipes';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);

    const nodeEnv = config.get<string>('NODE_ENV');
    const host = config.get<string>('HOST');
    const port = config.get<number>('PORT');
    const apiPrefix = config.get<string>('API_PREFIX');
    // FIXME: delete
    console.log('main node env', nodeEnv);
    console.log('main api prefix', apiPrefix);
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalInterceptors(new HttpStatusCodeInterceptor());
    app.useGlobalFilters(new TransformHttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: PipeExceptionFactories.validationPipeExceptionFactory,
        }),
    );

    await app.listen(port, host);
    Logger.log(`Application is started on http://${host}:${port}${apiPrefix} in ${nodeEnv} mode`);
}
bootstrap();
