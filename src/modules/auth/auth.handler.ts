import { Inject, Injectable } from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';

import { DI_TOKENS } from 'config';
import { Response, SecurityErrorResponse } from 'common/api/models/responses';
import type { IRequest, ISession } from 'common/api/interfaces';

import { AuthService } from './auth.service';
import type { CredentialsDTO } from './dto';
import type { AuthDTO } from './dto';

@Injectable()
export class AuthHandler {
    constructor(private readonly _usersService: AuthService) {}

    public async loginWithSession(session: ISession, dto: CredentialsDTO): Promise<Response<AuthDTO>> {
        const authDto = await this._usersService.checkAuthCredentials(dto);
        if (!authDto) {
            return new SecurityErrorResponse<AuthDTO>();
        }
        session.token = authDto.tokens.accessToken;
        const response = new Response<AuthDTO>();
        // FIXME: delete
        delete authDto.tokens;
        response.data = authDto;
        return response;
    }

    public async logoutFromSession(request: IRequest): Promise<Response<void>> {
        delete request.session.token;
        return new Response<void>();
    }
}
