import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

import type { ITokensService } from './tokens.interfaces';
import type { TokenDTO } from './dto';

@Injectable()
export class TokensService implements ITokensService {
    private readonly _jwtSecret: string;
    private readonly _accessLifetime: string;
    private readonly _refreshLifetime: string;
    private readonly _redisTokenPrefix: string;

    constructor(private readonly _configService: ConfigService) {
        this._jwtSecret = _configService.get<string>('JWT_SECRET');
        this._accessLifetime = _configService.get<string>('ACCESS_LIFETIME');
        this._refreshLifetime = _configService.get<string>('REFRESH_LIFETIME');
        this._redisTokenPrefix = _configService.get<string>('REDIS_TOKEN_PREFIX');
    }

    /**
     * Create access and refresh token object
     */
    public createTokenDto(guid: string): TokenDTO {
        return {
            accessToken: this.generateToken({ guid }, this._accessLifetime),
            refreshToken: this.generateToken({ guid }, this._refreshLifetime),
        };
    }

    /**
     * Generate JWT token
     */
    public generateToken(payload: Record<string, any>, exp: string | number): string {
        return sign(
            {
                ...payload,
                type: 'access',
            },
            this._jwtSecret,
            { expiresIn: exp },
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
