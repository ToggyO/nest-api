import { Logger, Module } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import { Environment } from 'config/environment';

import { ProductionLogger } from './logger.production';

@Module({
    providers: [
        {
            provide: DI_TOKENS.ILogger,
            useClass: process.env.NODE_ENV === Environment.Development ? Logger : ProductionLogger,
        },
    ],
    exports: [DI_TOKENS.ILogger],
})
export class LoggerModule {}
