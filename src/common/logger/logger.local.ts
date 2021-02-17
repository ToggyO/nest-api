import { Injectable, Scope } from '@nestjs/common';

import { CommonLogger } from './logger.common';

@Injectable({ scope: Scope.TRANSIENT })
export class LocalLogger extends CommonLogger {
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
}
