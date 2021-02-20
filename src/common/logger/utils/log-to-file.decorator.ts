import type { LogLevel } from '@nestjs/common';

import type { FunctionType } from 'declaration';

import { FileLoggerUtils } from './common';
import type { LogToFileMetadata } from '../logger.types';
import pack from '../../../../package.json';

export function LogToFile(metadata: LogToFileMetadata): MethodDecorator {
    const { level, catalogName } = metadata;
    const loggerUtils = new FileLoggerUtils({
        name: pack.name,
        version: pack.version,
        catalogName,
    });
    return (
        target: FunctionType | Record<string, any>,
        propertyKey: LogLevel,
        propertyDescriptor: TypedPropertyDescriptor<any>,
    ) => {
        const originalLoggerMethod = propertyDescriptor.value;
        const logLevel = level || propertyKey;
        const logger = loggerUtils.createFileLogger(logLevel);

        propertyDescriptor.value = function (message: any, context?: string) {
            // const logMessage = JSON.stringify(message);
            logger.log(logLevel, { message, context: context || this.context });
            return originalLoggerMethod.call(this, message, context);
        };

        return propertyDescriptor;
    };
}
