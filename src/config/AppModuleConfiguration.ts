import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Api modules
import { UsersModule } from 'modules/users/users.module';

// Application providers
import { DatabaseModule } from 'providers/database/database.module';
import { CryptoService } from 'providers/crypto';

import { DI_TOKENS } from './tokens';
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
        UsersModule,
    ];
    public readonly controllers: Array<Type<any>> = [];
    public readonly providers: Array<Provider> = [
        {
            provide: DI_TOKENS.ICryptoService,
            useClass: CryptoService,
        },
    ];
    public readonly exports: AppModuleExports = [DI_TOKENS.ICryptoService];
}
