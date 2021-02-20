import type { LogLevel } from '@nestjs/common';

export type LoggerOptions = {
    name: string;
    version: string;
    catalogName: string;
};

export type LogToFileMetadata = {
    level?: LogLevel;
    catalogName?: string;
};
