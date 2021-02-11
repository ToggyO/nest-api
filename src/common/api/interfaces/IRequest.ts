import { Request } from 'express';

import { ISession } from './ISession';
import { IJwtTokenPayload } from './IJwtTokenPayload';

export interface IRequest extends Request {
    session?: ISession;
    user?: IJwtTokenPayload;
}
