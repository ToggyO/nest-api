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
                getOrmConfig({
                    nodeEnv: configService.get<Environment>('NODE_ENV'),
                    host: configService.get<string>('POSTGRES_HOST'),
                    // port: configService.get<number>('POSTGRES_PORT'),
                    port: configService.get<number>('POSTGRES_EXTERNAL_PORT'),
                    username: configService.get<string>('POSTGRES_USER'),
                    password: configService.get<string>('POSTGRES_PASSWORD'),
                    dbName: configService.get<string>('POSTGRES_DATABASE'),
                }),
        }),
    ],
})
export class DatabaseModule {}
