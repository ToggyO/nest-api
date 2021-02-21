import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DI_TOKENS } from 'config';
import { RefreshTokenInvalidErrorResponse, Response, SecurityErrorResponse } from 'common/api/models/responses';
import type { IRequest, ISession } from 'common/api/interfaces';
import { IRedisProvider } from 'providers/redis';

import { AuthService } from './auth.service';
import type { CredentialsDTO } from './dto';
import type { AuthDTO } from './dto';

@Injectable()
export class AuthHandler {
    private readonly _redisKeyExpire: number;

    constructor(
        private readonly _configService: ConfigService,
        private readonly _authService: AuthService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
    ) {
        this._redisKeyExpire = this._configService.get<number>('REFRESH_LIFETIME');
    }

    public async loginWithSession(session: ISession, dto: CredentialsDTO): Promise<Response<AuthDTO>> {
        const authDto = await this._authService.checkAuthCredentials(dto);
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

    public async createTokens(dto: CredentialsDTO): Promise<Response<AuthDTO>> {
        const authDto = await this._authService.checkAuthCredentials(dto);
        if (!authDto) {
            return new SecurityErrorResponse<AuthDTO>();
        }
        await this._redisProvider.serializeAndSetWithExpirationAsync<AuthDTO>(
            authDto.user.id.toString(),
            authDto,
            this._redisKeyExpire,
        );
        const response = new Response<AuthDTO>();
        response.data = authDto;
        return response;
    }

    public async refreshTokens(refreshToken: string): Promise<Response<AuthDTO>> {
        const { id } = await this._authService.validateRefreshToken(refreshToken);
        if (!id) {
            return new RefreshTokenInvalidErrorResponse();
        }
        const { tokens, user } = await this._redisProvider.getAndDeserializeAsync<AuthDTO>(id.toString());
        if (tokens.refreshToken !== refreshToken) {
            return new RefreshTokenInvalidErrorResponse();
        }
        const authDto = this._authService.createAuthDto(user);
        await this._redisProvider.serializeAndSetWithExpirationAsync<AuthDTO>(
            user.id.toString(),
            authDto,
            this._redisKeyExpire,
        );
        const response = new Response<AuthDTO>();
        response.data = authDto;
        return response;
    }

    public async logoutWithTokens(request: IRequest): Promise<Response<void>> {
        const { id } = request.user;
        await this._redisProvider.deleteAsync(id.toString());
        return new Response<void>();
    }
}
