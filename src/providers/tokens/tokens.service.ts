import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

import { IJwtTokenPayload } from 'common/api/interfaces';

import { ITokensService } from './tokens.interfaces';

@Injectable()
export class TokensService implements ITokensService {
    private readonly _jwtSecret: string;
    private readonly _sessionMaxAge: string;
    private readonly _redisTokenPrefix: string;

    constructor(private readonly _configService: ConfigService) {
        this._jwtSecret = _configService.get<string>('JWT_SECRET');
        this._sessionMaxAge = _configService.get<string>('SESSION_MAX_AGE');
        this._redisTokenPrefix = _configService.get<string>('REDIS_TOKEN_PREFIX');
    }

    /**
     * Generate JWT token
     */
    public generateToken(payload: IJwtTokenPayload): string {
        return sign(
            {
                ...payload,
                type: 'access',
            },
            this._jwtSecret,
            { expiresIn: this._sessionMaxAge },
        );
    }

    /**
     * Check if JWT token is valid
     */
    public checkToken<T extends Record<string, any>>(token: string): T | null {
        let payload: T | null = null;
        verify(token, this._jwtSecret, (err, decoded) => {
            payload = decoded as any;
        });
        return payload;
    }

    /**
     * Check if JWT token is valid asynchronous
     */
    public async checkTokenAsync<T extends Record<string, any>>(token: string): Promise<null | T> {
        try {
            return verify(token, this._jwtSecret) as T;
        } catch (error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                return null;
            }
            return null;
        }
    }
}
