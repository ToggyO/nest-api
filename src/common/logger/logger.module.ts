import { Module } from '@nestjs/common';

import { DI_TOKENS, Environment } from 'config';

import { LocalLogger } from './logger.local';
import { ProductionLogger } from './logger.production';

@Module({
    providers: [
        {
            provide: DI_TOKENS.ILogger,
            useClass: process.env.NODE_ENV === Environment.Development ? LocalLogger : ProductionLogger,
        },
    ],
    exports: [DI_TOKENS.ILogger],
})
export class LoggerModule {}
