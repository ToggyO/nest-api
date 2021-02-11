import { IJwtTokenPayload } from 'common/api/interfaces';

export interface ITokensService {
    generateToken(payload: IJwtTokenPayload): string;
    checkToken<T extends Record<string, any>>(token: string): T | null;
    checkTokenAsync<T extends Record<string, any>>(token: string): Promise<null | T>;
}
