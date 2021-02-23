import type { IJwtTokenPayload } from 'common/api/interfaces';
import type { TokenDTO } from './dto';

export interface ITokensService {
    createTokenDto(guid: string): TokenDTO;
    generateToken(payload: Record<string, any>, exp: string | number): string;
    checkToken<T extends Record<string, any>>(token: string): T | null;
    checkTokenAsync<T extends Record<string, any>>(token: string): Promise<null | T>;
}
