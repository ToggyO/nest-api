import { join } from 'path';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Environment } from 'config/environment';

export type OrmConfigEnvironment = {
    nodeEnv: Environment;
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
};

function getMigrationDirectory(nodeEnv: Environment): string {
    const directory = nodeEnv === Environment.Migration ? join(process.cwd(), 'src') : join(__dirname, '..', '..');
    console.log(`${directory}/dao/migrations/**/*{.ts,.js}`);
    return `${directory}/dao/migrations/**/*{.ts,.js}`;
}

function getDatabasePath(nodeEnv: Environment, dbName: string) {
    // const var1 = join(__dirname, 'data', `${dbName}.sqlite`);
    console.log('__dirname', __dirname);
    const var1 = join(process.cwd(), 'data', `${dbName}.sqlite`);
    const var2 = join(__dirname, '..', '..', '..', 'data', `${dbName}.sqlite`);
    const result = nodeEnv === Environment.Development ? var1 : var2;
    console.log('process.cwd()', process.cwd());
    console.log('var1', var1);
    console.log('var2', var2);
    console.log('result', result);
    return nodeEnv === Environment.Development ? var1 : var2;
    // return nodeEnv === Environment.Development
    //     ? join(__dirname, '..', '..', '..', 'data', `${dbName}.sqlite`)
    //     : join(__dirname, 'data', `${dbName}.sqlite`);
}

console.log('entities', join(__dirname, '..', '..', 'dao', 'entities', '**{.ts,.js}'));
// TODO: check CLI section in prod
export const getOrmConfig = (options: OrmConfigEnvironment): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    // database: join(__dirname, '..', '..', '..', 'data', `${dbName}.sqlite`),
    // database: getDatabasePath(options.nodeEnv, options.dbName),
    database: options.dbName,
    entities: [join(__dirname, '..', '..', 'dao', 'entities', '**{.ts,.js}')],
    // migrations: [join(__dirname, '..', '..', 'dao', 'migrations', '**{.ts,.js}')],
    migrations: [getMigrationDirectory(options.nodeEnv)],
    subscribers: [join(__dirname, '..', '..', 'dao', 'subscribers', '**{.ts,.js}')],
    cli: {
        // entitiesDir: join(__dirname, '..', '..', 'dao', 'entities'),
        entitiesDir: 'src/dao/entities',
        // migrationsDir: join(__dirname, '..', '..', 'dao', 'migrations'),
        migrationsDir: 'src/dao/migrations',
        // subscribersDir: join(__dirname, '..', '..', 'dao', 'subscribers'),
        subscribersDir: 'src/dao/subscribers',
    },
    logging: options.nodeEnv === Environment.Development,
    synchronize: false,
    keepConnectionAlive: true,
});
