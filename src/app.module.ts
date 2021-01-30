import { Module } from '@nestjs/common';

import { AppModuleConfiguration } from 'config';

import { AppController } from './app.controller';

const config = new AppModuleConfiguration();

@Module({
    imports: [...config.imports],
    controllers: [AppController, ...config.controllers],
    providers: [...config.providers],
    exports: [...config.exports],
})
export class AppModule {}
