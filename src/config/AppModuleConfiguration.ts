import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from 'modules/users/users.module';

import type { AppModuleExports, AppModuleImports } from './types';
import { Environment, validate } from './environment';
import { DI_TOKENS } from './tokens';

const NODE_ENV = process.env.NODE_ENV || Environment.Development;

export class AppModuleConfiguration implements ModuleMetadata {
    public readonly imports: AppModuleImports = [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `.env.${NODE_ENV}`,
            validate,
        }),
    ];
    public readonly controllers: Array<Type<any>> = [];
    public readonly providers: Array<Provider> = [];
    public readonly exports: AppModuleExports = [];
}
