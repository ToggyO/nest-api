import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import { IRedisProvider } from 'providers/redis';
import type { AuthDTO } from 'modules/auth/dto';

import { IS_PUBLIC_KEY } from '../decorators';
import { InvalidTokenHttpException } from '../exceptions';
import type { IRequest } from '../interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly _jwtSecret: string;
    private readonly _authHeader: string;

    constructor(
        private readonly _reflector: Reflector,
        private readonly _configService: ConfigService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
    ) {
        this._jwtSecret = _configService.get<string>('JWT_SECRET');
        this._authHeader = _configService.get<string>('AUTH_HEADER');
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<IRequest>();
        const accessToken = (
            request.get(this._authHeader) ??
            request.get(this._authHeader.toLowerCase()) ??
            ''
        ).replace('Bearer ', '');
        if (!accessToken) {
            throw new UnauthorizedException();
        }

        let payload: { guid: string };
        try {
            payload = verify(accessToken, this._jwtSecret) as { guid: string };
        } catch (error) {
            throw new UnauthorizedException();
        }

        const authDto = await this._redisProvider.getAndDeserializeAsync<AuthDTO>(payload.guid);
        if (!authDto) {
            throw new InvalidTokenHttpException();
        }
        request.user = authDto.user;
        request.guid = payload.guid;
        return true;
    }
}
