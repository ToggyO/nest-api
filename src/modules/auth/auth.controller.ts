import { Body, Controller, Get, Post, Put, Req, Session, UseGuards } from '@nestjs/common';

import { IRequest, ISession } from 'common/api/interfaces';
import { JwtAuthGuard } from 'common/api/guards';
import type { Response } from 'common/api/models/responses';

import { CredentialsDTO, AuthDTO, RefreshTokenDTO } from './dto';
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

    @Post('token')
    public async loginWithToken(@Body() credentialsDTO: CredentialsDTO): Promise<Response<AuthDTO>> {
        return this._handler.createTokens(credentialsDTO);
    }

    @Put('token')
    public async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDTO): Promise<Response<AuthDTO>> {
        return this._handler.refreshTokens(refreshTokenDto.refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout/token')
    public async logoutWithToken(@Req() request: IRequest): Promise<Response<void>> {
        return this._handler.logoutWithTokens(request);
    }
}
