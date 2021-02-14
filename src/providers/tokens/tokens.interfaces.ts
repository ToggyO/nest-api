import type { IJwtTokenPayload } from 'common/api/interfaces';
import type { IUser } from 'domain/entities/user/IUser';
import type { TokenDTO } from './dto';

export interface ITokensService {
    createTokenDto(user: IUser): TokenDTO;
    generateToken(payload: IJwtTokenPayload, exp: string | number): string;
    checkToken<T extends Record<string, any>>(token: string): T | null;
    checkTokenAsync<T extends Record<string, any>>(token: string): Promise<null | T>;
}
