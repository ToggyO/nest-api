import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

import { IJwtTokenPayload, IRequest } from 'common/api/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly _jwtSecret: string;

    constructor(private readonly _configService: ConfigService) {
        this._jwtSecret = _configService.get<string>('JWT_SECRET');
    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest<IRequest>();
        const { session } = request;
        if (!session) {
            return false;
        }
        const { token } = session;
        if (!token) {
            return false;
        }
        let user: IJwtTokenPayload;
        try {
            user = verify(token, this._jwtSecret) as IJwtTokenPayload;
        } catch (error) {
            delete session.token;
            return false;
        }
        request.user = user;
        return true;
    }
}
