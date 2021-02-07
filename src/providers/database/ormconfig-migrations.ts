import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';

import { Environment } from 'config';

import { getOrmConfig } from './ormconfig';

const env = (() => {
    // FIXME:
    const { NODE_ENV = 'development' } = process.env;
    const dotenvDir = path.join(process.cwd(), `.env.development`);
    const envVars = dotenv.parse(fs.readFileSync(dotenvDir));
    return {
        ...envVars,
    };
})();

module.exports = getOrmConfig(env.NODE_ENV as Environment, env.DB_NAME);
