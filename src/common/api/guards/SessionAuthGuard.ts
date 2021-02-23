import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

import type { IRequest } from 'common/api/interfaces';

import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    private readonly _jwtSecret: string;

    constructor(private readonly _configService: ConfigService, private readonly _reflector: Reflector) {
        this._jwtSecret = _configService.get<string>('JWT_SECRET');
    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const http = context.switchToHttp();
        const request = http.getRequest<IRequest>();
        const { session } = request;
        if (!session) {
            return false;
        }
        const { token, user } = session;
        if (!token) {
            return false;
        }
        try {
            verify(token, this._jwtSecret);
        } catch (error) {
            delete session.token;
            return false;
        }
        request.user = user;
        return true;
    }
}
