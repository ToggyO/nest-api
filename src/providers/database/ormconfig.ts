import { join } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Environment } from 'config/environment';

function getMigrationDirectory(nodeEnv: Environment): string {
    const directory = nodeEnv === Environment.Migration ? join(process.cwd(), 'src') : join(__dirname, '..', '..');
    console.log(`${directory}/dao/migrations/**/*{.ts,.js}`);
    return `${directory}/dao/migrations/**/*{.ts,.js}`;
}

function getDatabasePath(nodeEnv: Environment, dbName: string) {
    return nodeEnv === Environment.Development
        ? join(__dirname, '..', '..', '..', 'data', `${dbName}.sqlite`)
        : join(__dirname, 'data', `${dbName}.sqlite`);
}
// TODO: check CLI section in prod
export const getOrmConfig = (nodeEnv: Environment, dbName: string): TypeOrmModuleOptions => ({
    type: 'sqlite',
    // database: join(__dirname, '..', '..', '..', 'data', `${dbName}.sqlite`),
    database: getDatabasePath(nodeEnv, dbName),
    entities: [join(__dirname, '..', '..', 'dao', 'entities', '**{.ts,.js}')],
    // migrations: [join(__dirname, '..', '..', 'dao', 'migrations', '**{.ts,.js}')],
    migrations: [getMigrationDirectory(nodeEnv)],
    subscribers: [join(__dirname, '..', '..', 'dao', 'subscribers', '**{.ts,.js}')],
    cli: {
        // entitiesDir: join(__dirname, '..', '..', 'dao', 'entities'),
        entitiesDir: 'src/dao/entities',
        // migrationsDir: join(__dirname, '..', '..', 'dao', 'migrations'),
        migrationsDir: 'src/dao/migrations',
        // subscribersDir: join(__dirname, '..', '..', 'dao', 'subscribers'),
        subscribersDir: 'src/dao/subscribers',
    },
    logging: nodeEnv === Environment.Development,
    synchronize: false,
    keepConnectionAlive: true,
});
