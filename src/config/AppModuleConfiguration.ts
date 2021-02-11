import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Api modules
import { UsersModule } from 'modules/users/users.module';

// Application providers
import { DatabaseModule } from 'providers/database/database.module';
import { RedisClientModule } from 'providers/redis';
import { TokensModule } from 'providers/tokens';

import type { AppModuleExports, AppModuleImports } from './types';
import { Environment, validate } from './environment';

const NODE_ENV = process.env.NODE_ENV || Environment.Development;

export class AppModuleConfiguration implements ModuleMetadata {
    public readonly imports: AppModuleImports = [
        ConfigModule.forRoot({
            envFilePath: `.env.${NODE_ENV}`,
            validate,
        }),
        DatabaseModule,
        RedisClientModule,
        TokensModule,
        UsersModule,
    ];
    public readonly controllers: Array<Type<any>> = [];
    public readonly providers: Array<Provider> = [];
    public readonly exports: AppModuleExports = [];
}
