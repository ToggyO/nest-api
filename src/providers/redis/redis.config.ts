import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from 'nestjs-redis';
import { Environment } from 'config/environment';

export const getRedisConfig = (configService: ConfigService): RedisModuleOptions => ({
    host: configService.get<string>('REDIS_HOST'),
    port:
        configService.get<Environment>('NODE_ENV') === Environment.Development
            ? configService.get<number>('REDIS_EXTERNAL_PORT')
            : configService.get<number>('REDIS_PORT'),
    db: configService.get<number>('REDIS_DB'),
    password: configService.get<string>('REDIS_PASSWORD'),
    keyPrefix: configService.get<string>('REDIS_TOKEN_PREFIX'),
});
