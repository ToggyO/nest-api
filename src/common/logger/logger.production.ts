import path from 'path';
import fs from 'fs';

import { Injectable, Logger, Scope } from '@nestjs/common';

import { LogToFile } from './utils/log-to-file.decorator';

@Injectable({ scope: Scope.TRANSIENT })
export class ProductionLogger extends Logger {
    public static catalogName = 'log';

    constructor() {
        super();
        // ensure log directory exists
        const logDirectory = path.join(__dirname, `../../../${ProductionLogger.catalogName}`);
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    }

    @LogToFile({ catalogName: ProductionLogger.catalogName })
    public log(message: any, context?: string) {
        super.log(message, context);
    }

    @LogToFile({ catalogName: ProductionLogger.catalogName })
    public error(message: any, trace?: string, context?: string) {
        super.error(message, trace, context);
    }

    @LogToFile({ catalogName: ProductionLogger.catalogName })
    public warn(message: any, context?: string) {
        super.warn(message, context);
    }

    @LogToFile({ catalogName: ProductionLogger.catalogName })
    public debug(message: any, context?: string) {
        super.debug(message, context);
    }

    @LogToFile({ catalogName: ProductionLogger.catalogName })
    public verbose(message: any, context?: string) {
        super.verbose(message, context);
    }
}
