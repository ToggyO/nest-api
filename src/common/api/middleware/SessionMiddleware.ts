import type { NestMiddleware } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NextFunction, Response } from 'express';

import { DI_TOKENS } from 'config';
import type { IRequest, ISession } from 'common/api/interfaces';
import { IRedisProvider } from 'providers/redis';
import { Generator } from 'utils/generator';

@Injectable()
export class SessionMiddleware implements NestMiddleware<IRequest, Response> {
    private readonly _identityHeader: string;
    private readonly _redisTokenPrefix: string;

    constructor(
        private readonly _configService: ConfigService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
    ) {
        this._identityHeader = _configService.get<string>('IDENTITY_HEADER');
        this._redisTokenPrefix = _configService.get<string>('REDIS_TOKEN_PREFIX');
    }

    public async use(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        if (req.session) {
            return next();
        }
        let sessionId = req.get(this._identityHeader) || req.get(this._identityHeader.toLowerCase()) || '';
        if (!sessionId) {
            sessionId = Generator.generateUid();
        }

        let session = await this._redisProvider.getAndDeserializeAsync<ISession>(sessionId);
        if (!session) {
            session = this._createSessionObject(sessionId);
        }

        req.session = this._getSessionChangeHandler(session);
        res.setHeader(this._identityHeader, sessionId);
        next();
    }

    /**
     * Create session object
     */
    private _createSessionObject(sessionId: string): ISession {
        return { sessionId };
    }

    /**
     * Warps session object into Proxy, to save session into Redis on change
     */
    private _getSessionChangeHandler(session: ISession): ISession {
        return new Proxy(session, {
            set: (target: ISession, key: keyof ISession, value): boolean => {
                let descriptor = Object.getOwnPropertyDescriptor(target, key);
                if (!descriptor) {
                    descriptor = {
                        value,
                        writable: true,
                        enumerable: true,
                        configurable: false,
                    };
                } else {
                    descriptor.value = value;
                }
                Object.defineProperty(target, key, descriptor);
                this._redisProvider.serializeAndSetWithExpiration<ISession>(
                    session.sessionId,
                    target,
                    60 * 60 * 24,
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    () => {},
                );
                return true;
            },

            deleteProperty: (target: ISession, key: keyof ISession): boolean => {
                if (key in target) {
                    delete target[key];
                    this._redisProvider.serializeAndSetWithExpiration(
                        session.sessionId,
                        target,
                        60 * 60 * 24,
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        () => {},
                    );
                }
                return true;
            },
        });
    }
}
