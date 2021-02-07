import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Environment } from 'config/environment';

import { getOrmConfig } from './ormconfig';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                getOrmConfig(configService.get<Environment>('NODE_ENV'), configService.get<string>('DB_NAME')),
        }),
    ],
})
export class DatabaseModule {}
