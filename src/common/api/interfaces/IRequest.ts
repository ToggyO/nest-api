import type { Request } from 'express';

import type { ISession } from './ISession';
import type { IJwtTokenPayload } from './IJwtTokenPayload';

export interface IRequest extends Request {
    session?: ISession;
    user?: IJwtTokenPayload;
}
