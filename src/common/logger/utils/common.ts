import { createLogger, format, transports } from 'winston';
import type { Logger as WinstonLogger } from 'winston';
import type { LogLevel } from '@nestjs/common';
import type { FormatWrap, TransformableInfo } from 'logform';

import type { LoggerOptions } from '../logger.types';

const { combine, json, prettyPrint } = format;

export class FileLoggerUtils {
    constructor(protected readonly _options: LoggerOptions) {}

    public createFileLogger(level: LogLevel): WinstonLogger {
        const { name } = this._options;
        return createLogger({
            level,
            defaultMeta: { service: name },
            transports: this._createFileTransport(level),
            exitOnError: false,
        });
    }

    protected _createFileTransport(level: LogLevel) {
        const { catalogName } = this._options;
        const custom = this._transportFormatterCustom();
        const fileTransport = new transports.File({
            level,
            filename: `${catalogName}/${level}.log`,
            maxsize: 10485760, // 10MB
            maxFiles: 5,
            format: combine(custom({ type: 'file' }), json(), prettyPrint()),
        });
        return [fileTransport];
    }

    protected _transportFormatterCustom(): FormatWrap {
        return format((info: TransformableInfo): TransformableInfo => this._transportDataFormatter(info));
    }

    protected _transportDataFormatter(info: TransformableInfo): TransformableInfo {
        const { version } = this._options;
        const now = new Date();
        const accidentAt = now.toISOString();
        const wasLaunchedAt = this._getUpDate();

        if (wasLaunchedAt) {
            info.wasLaunchedAt = wasLaunchedAt;
        }
        if (accidentAt) {
            info.accidentAt = accidentAt;
        }
        if (version) {
            info.version = version;
        }

        return info;
    }

    protected _getUpDate(): string {
        const now = Date.now();
        const upTime = process.uptime();
        const upDateInMS = now - upTime;
        return new Date(upDateInMS).toISOString();
    }
}
