import type { LogLevel } from '@nestjs/common';
import { Injectable, Scope } from '@nestjs/common';
import type { Logger as WinstonLogger } from 'winston';
import { transports, format, createLogger } from 'winston';

import { CommonLogger } from './logger.common';
import pack from '../../../package.json';

const { combine } = format;

@Injectable({ scope: Scope.TRANSIENT })
export class ProductionLogger extends CommonLogger {
    constructor(protected readonly _catalogName: string) {
        super({ name: pack.name, version: pack.version });
    }

    public log(message: any, context?: string) {
        super.log(message, context);
    }

    public error(message: any, trace?: string, context?: string) {
        super.error(message, trace, context);
    }

    public warn(message: any, context?: string) {
        super.warn(message, context);
    }

    public debug(message: any, context?: string) {
        super.debug(message, context);
    }

    public verbose(message: any, context?: string) {
        super.verbose(message, context);
    }

    protected _createFileTransport(level: LogLevel) {
        const custom = this._transportFormatterCustom();
        const fileTransport = new transports.File({
            level,
            filename: `file#${level}`,
            maxsize: 10485760, // 10MB
            maxFiles: 5,
            format: combine(custom({ type: 'file' })),
        });
        return [fileTransport];
    }

    protected _createFileLogger(level: LogLevel): WinstonLogger {
        const { name } = this._options;
        return createLogger({
            level,
            defaultMeta: { service: name },
            transports: this._createFileTransport(level),
            exitOnError: false,
        });
    }

    protected _logMethodsFabric() {}
}
