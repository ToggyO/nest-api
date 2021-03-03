import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';

import type { Environment } from 'config';

import { getOrmConfig } from './ormconfig';

const env = (() => {
    // FIXME:
    const { NODE_ENV = 'development' } = process.env;
    console.log('In migration config', NODE_ENV);
    // console.log('process.env', process.env);
    const dotenvDir = path.join(process.cwd(), `.env.${NODE_ENV}`);
    const envVars = dotenv.parse(fs.readFileSync(dotenvDir));
    return {
        ...envVars,
    };
})();

Object.entries({
    nodeEnv: env.NODE_ENV as Environment,
    host: env.POSTGRES_HOST,
    // port: parseInt(env.POSTGRES_PORT),
    port: parseInt(env.POSTGRES_EXTERNAL_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    dbName: env.POSTGRES_DATABASE,
}).forEach(([key, val]) => console.log(`${key}: ${val}`));

module.exports = getOrmConfig({
    nodeEnv: env.NODE_ENV as Environment,
    host: env.POSTGRES_HOST,
    // port: parseInt(env.POSTGRES_PORT),
    port: parseInt(env.POSTGRES_EXTERNAL_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    dbName: env.POSTGRES_DATABASE,
});
