import type { Abstract, DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';

import type { FunctionType } from 'declaration';

export type AppModuleImports = Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
export type AppModuleExports = Array<
    | DynamicModule
    | Promise<DynamicModule>
    | string
    | symbol
    | Provider
    | ForwardReference
    | Abstract<any>
    | FunctionType
>;
