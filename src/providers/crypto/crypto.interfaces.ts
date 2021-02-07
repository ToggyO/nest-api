import { HashedPasswordComponents } from 'providers/crypto/crypto.types';

export interface ICryptoService {
    encrypt(string: string): string;
    decrypt(encryptedString: string): string;
    hashPassword(password: string): HashedPasswordComponents;
    verifyPassword(password: string, passwordHash: string, saltWithPepper: string): boolean;
}
