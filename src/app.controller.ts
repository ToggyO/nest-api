import { Controller, Get } from '@nestjs/common';

import { HealthCheckDTO } from 'declaration';

@Controller()
export class AppController {
    private readonly _serverStartTime: string;

    constructor() {
        this._serverStartTime = this._getServerStartTime();
    }

    @Get()
    public async healthCheck(): Promise<HealthCheckDTO> {
        return {
            message: 'Online',
            startedAt: this._serverStartTime,
        };
    }

    private _getServerStartTime(): string {
        return `${new Date().toISOString()} UTC`;
    }
}
