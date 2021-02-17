import { Logger } from '@nestjs/common';
import { format } from 'winston';
import type { FormatWrap, TransformableInfo } from 'logform';

import type { LoggerOptions } from './types';

export class CommonLogger extends Logger {
    constructor(protected readonly _options: LoggerOptions) {
        super();
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

    private _getUpDate(): string {
        const now = Date.now();
        const upTime = process.uptime();
        const upDateInMS = now - upTime;
        return new Date(upDateInMS).toISOString();
    }
}
