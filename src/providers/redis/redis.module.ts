import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

import { DI_TOKENS } from 'config';

import { getRedisConfig } from './redis.config';
import { RedisProvider } from './redis.provider';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => getRedisConfig(configService),
        }),
    ],
    providers: [
        {
            provide: DI_TOKENS.IRedisProvider,
            useClass: RedisProvider,
        },
    ],
    exports: [DI_TOKENS.IRedisProvider],
})
export class RedisClientModule {}
