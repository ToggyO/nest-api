import { Inject, Injectable } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import {
    RefreshTokenExpiredErrorResponse,
    RefreshTokenInvalidErrorResponse,
    Response,
    SecurityErrorResponse,
} from 'common/api/models/responses';
import type { IRequest, ISession } from 'common/api/interfaces';
import { IRedisProvider } from 'providers/redis';

import { AuthService } from './auth.service';
import type { CredentialsDTO } from './dto';
import type { AuthDTO } from './dto';
import type { RefreshTokenPayload } from './auth.types';

@Injectable()
export class AuthHandler {
    constructor(
        private readonly _authService: AuthService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
    ) {}

    public async loginWithSession(session: ISession, dto: CredentialsDTO): Promise<Response<AuthDTO>> {
        const authDto = await this._authService.checkAuthCredentials(dto);
        if (!authDto) {
            return new SecurityErrorResponse<AuthDTO>();
        }
        session.token = authDto.tokens.accessToken;
        session.user = authDto.user;
        const response = new Response<AuthDTO>();
        // FIXME: delete
        delete authDto.tokens;
        response.data = authDto;
        return response;
    }

    public async logoutFromSession(request: IRequest): Promise<Response<void>> {
        delete request.session.token;
        delete request.session.user;
        return new Response<void>();
    }

    public async createTokens(dto: CredentialsDTO): Promise<Response<AuthDTO>> {
        const authDto = await this._authService.checkAuthCredentials(dto, true);
        if (!authDto) {
            return new SecurityErrorResponse<AuthDTO>();
        }
        const response = new Response<AuthDTO>();
        response.data = authDto;
        return response;
    }

    public async refreshTokens(refreshToken: string): Promise<Response<AuthDTO>> {
        const { guid } = await this._authService.validateToken<RefreshTokenPayload>(refreshToken);
        if (!guid) {
            return new RefreshTokenExpiredErrorResponse();
        }
        const oldAuthDto = await this._authService.checkRefreshTokenEquality(guid, refreshToken);
        if (!oldAuthDto) {
            return new RefreshTokenInvalidErrorResponse();
        }
        const authDto = await this._authService.createAuthDto(oldAuthDto.user, {
            existedGuid: guid,
            saveToRedis: true,
        });
        const response = new Response<AuthDTO>();
        response.data = authDto;
        return response;
    }

    public async logoutWithTokens(request: IRequest): Promise<Response<void>> {
        const { guid } = request;
        await this._redisProvider.deleteAsync(guid);
        return new Response<void>();
    }
}
