import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';

import type { Response } from 'common/api/models/responses';
import { IRequest, ISession } from 'common/api/interfaces';

import { CredentialsDTO, AuthDTO } from './dto';
import { AuthHandler } from './auth.handler';

@Controller('auth')
export class AuthController {
    constructor(private readonly _handler: AuthHandler) {}

    @Post('session')
    public async loginWithSession(
        @Session() session: ISession,
        @Body() credentialsDTO: CredentialsDTO,
    ): Promise<Response<AuthDTO>> {
        return this._handler.loginWithSession(session, credentialsDTO);
    }

    @Get('logout/session')
    public async logoutFromSession(@Req() request: IRequest): Promise<Response<void>> {
        return this._handler.logoutFromSession(request);
    }
}
