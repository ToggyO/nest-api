import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from 'config';
import { HttpStatusCodeInterceptor } from 'common/api/interceptors';
import { TransformHttpExceptionFilter } from 'common/api/filters';
import { PipeExceptionFactories } from 'common/api/pipes';

export type BootstrappingServerSettings = {
    host: string;
    port: number;
    apiPrefix: string;
    nodeEnv: Environment;
};

export class AppSettings {
    public static load(app: NestExpressApplication): BootstrappingServerSettings {
        const config = app.get(ConfigService);
        const nodeEnv = config.get<Environment>('NODE_ENV');
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
        return { host, port, apiPrefix, nodeEnv };
    }
}
