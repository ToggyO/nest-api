import type { HashedPasswordComponents } from '../../services/crypto.service';
import { CryptoService } from '../../services/crypto.service';

import type { IUser } from './IUser';
import { Roles } from 'domain/entities/user/roles.enum';

export class UserEntity implements IUser {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public passwordHash: string;
    public salt: string;
    public role: Roles = Roles.User;
    public avatar: string | null = null;

    public static createSaltAndHash(password: string): HashedPasswordComponents {
        const cryptoService = new CryptoService();
        return cryptoService.hashPassword(password);
    }

    public static verifyPassword(password: string, passwordHash: string, saltWithPepper: string): boolean {
        const cryptoService = new CryptoService();
        return cryptoService.verifyPassword(password, passwordHash, saltWithPepper);
    }
}
