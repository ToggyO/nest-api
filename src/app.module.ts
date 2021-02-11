import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { AppModuleConfiguration } from 'config';
import { SessionMiddleware } from 'common/api/middleware';

import { AppController } from './app.controller';

const config = new AppModuleConfiguration();

@Module({
    imports: [...config.imports],
    controllers: [AppController, ...config.controllers],
    providers: [...config.providers],
    exports: [...config.exports],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SessionMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
