import type { IJwtTokenPayload } from './IJwtTokenPayload';

export interface ISession {
    sessionId: string;
    token?: string;
    user?: IJwtTokenPayload;
}
