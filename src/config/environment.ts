import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Migration = 'migration',
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    public NODE_ENV: Environment;

    @IsString()
    public API_PREFIX: string;

    @IsString()
    public HOST: string;

    @IsNumber()
    public PORT: number;

    @IsString()
    public DB_NAME: string;

    @IsString()
    public CRYPTO_SECRET: string;
}

export function validate(config: Record<string, number>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
