import { Body, Controller, Get, HttpStatus, Post, Put, Req, Session, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { IRequest, ISession } from 'common/api/interfaces';
import { JwtAuthGuard } from 'common/api/guards';
import { ApiBaseResponse, ApiErrorResponse, ApiSuccessfulOperation } from 'common/swagger';
import type { Response } from 'common/api/models/responses';

import { AuthDTO, CredentialsDTO, RefreshTokenDTO } from './dto';
import { AuthHandler } from './auth.handler';
import { ApiSecurityErrorResponse } from 'common/swagger/decorators/api-security-error-response';

@Controller('auth')
@ApiTags('Auth')
@ApiExtraModels(AuthDTO)
export class AuthController {
    constructor(private readonly _handler: AuthHandler) {}

    @Post('session')
    @ApiBaseResponse(AuthDTO, HttpStatus.CREATED)
    @ApiSecurityErrorResponse()
    @ApiExcludeEndpoint()
    public async loginWithSession(
        @Session() session: ISession,
        @Body() credentialsDTO: CredentialsDTO,
    ): Promise<Response<AuthDTO>> {
        return this._handler.loginWithSession(session, credentialsDTO);
    }

    @Get('logout/session')
    @ApiSuccessfulOperation()
    @ApiErrorResponse(HttpStatus.UNAUTHORIZED)
    @ApiExcludeEndpoint()
    public async logoutFromSession(@Req() request: IRequest): Promise<Response<void>> {
        return this._handler.logoutFromSession(request);
    }

    @Post('token')
    @ApiBaseResponse(AuthDTO, HttpStatus.CREATED)
    @ApiSecurityErrorResponse()
    public async loginWithToken(@Body() credentialsDTO: CredentialsDTO): Promise<Response<AuthDTO>> {
        return this._handler.createTokens(credentialsDTO);
    }

    @Put('token')
    @ApiBaseResponse(AuthDTO)
    @ApiErrorResponse(HttpStatus.UNAUTHORIZED, 'Refresh token expired')
    @ApiErrorResponse(HttpStatus.CONFLICT, 'Refresh token invalid')
    public async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDTO): Promise<Response<AuthDTO>> {
        return this._handler.refreshTokens(refreshTokenDto.refreshToken);
    }

    @Get('logout/token')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSuccessfulOperation()
    @ApiErrorResponse(HttpStatus.UNAUTHORIZED)
    public async logoutWithToken(@Req() request: IRequest): Promise<Response<void>> {
        return this._handler.logoutWithTokens(request);
    }
}
