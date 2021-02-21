import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsNotEmpty, validateSync } from 'class-validator';

export enum Environment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Migration = 'migration',
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

export class EnvironmentVariables {
    @IsEnum(Environment)
    public NODE_ENV: Environment;

    @IsNotEmpty()
    public API_PREFIX: string;

    @IsNotEmpty()
    public HOST: string;

    @IsNotEmpty()
    public PORT: number;

    @IsNotEmpty()
    public DB_NAME: string;

    @IsNotEmpty()
    public CRYPTO_SECRET: string;

    @IsNotEmpty()
    public AUTH_HEADER: string;

    @IsNotEmpty()
    public IDENTITY_HEADER: string;

    @IsNotEmpty()
    public JWT_SECRET: string;

    @IsNumber()
    public ACCESS_LIFETIME: number;

    @IsNumber()
    public REFRESH_LIFETIME: number;

    @IsNotEmpty()
    public REDIS_HOST: string;

    @IsNotEmpty()
    public REDIS_PASSWORD: string;

    @IsNumber()
    public REDIS_DB: number;

    @IsNumber()
    public REDIS_PORT: number;

    @IsNumber()
    public REDIS_EXTERNAL_PORT: number;

    @IsNotEmpty()
    public REDIS_TOKEN_PREFIX: string;
}
