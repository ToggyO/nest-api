import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import type { HealthCheckDTO } from 'declaration';

@ApiTags('Api')
@Controller()
export class AppController {
    private readonly _serverStartTime: string;

    constructor() {
        this._serverStartTime = this._getServerStartTime();
    }

    @Get()
    public async healthCheck(@Res() response: Response): Promise<Response> {
        return response.status(200).json({
            message: 'Online',
            startedAt: this._serverStartTime,
        } as HealthCheckDTO);
    }

    private _getServerStartTime(): string {
        return `${new Date().toISOString()} UTC`;
    }
}
