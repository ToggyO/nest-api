/**
 * Description: Helper class with cryptographic functionality
 */

import crypto from 'crypto';

export type HashedPasswordComponents = { salt: string; hash: string };

export class CryptoService {
    private readonly _algorithm = 'aes-192-cbc';
    private readonly _key: Buffer;
    private readonly _iv: Buffer;

    constructor() {
        const cryptoSecret = process.env.CRYPTO_SECRET;
        console.log(cryptoSecret);
        this._key = crypto.scryptSync(cryptoSecret as crypto.BinaryLike, 'salt', 24);
        this._iv = Buffer.alloc(16, 0);
    }

    /**
     * Encrypt string
     * @param {string} string - string to encrypt
     * @returns {string} - hash
     */
    public encrypt(string: string): string {
        const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);
        let encrypted = cipher.update(string, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    /**
     * Decrypt string
     * @param {string} encryptedString - string to decrypt
     * @returns {string} - decrypted string
     */
    public decrypt(encryptedString: string): string {
        const decipher = crypto.createDecipheriv(this._algorithm, this._key, this._iv);
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    /**
     * Hash password
     * @param {string} password
     * @returns {{ salt: string, hash: string }} - hash
     */
    public hashPassword(password: string): HashedPasswordComponents {
        const salt = crypto.randomBytes(32).toString('hex');
        const saltWithPepper = this.encrypt(salt);
        const hash = crypto.pbkdf2Sync(password, saltWithPepper, 2048, 124, 'sha512').toString('hex');
        return { salt: saltWithPepper, hash };
    }

    /**
     * Compare password with hashed password
     * @param {string} password
     * @param {string} passwordHash - hashed password
     * @param {string} saltWithPepper - salt
     * @returns {boolean} - equivalence of password and hashed password
     */
    public verifyPassword(password: string, passwordHash: string, saltWithPepper: string): boolean {
        const hash = crypto.pbkdf2Sync(password, saltWithPepper, 2048, 32, 'sha512').toString('hex');
        return passwordHash === hash;
    }
}
// export class CryptoService {
//     private static readonly _algorithm = 'aes-192-cbc';
//     private static readonly _key = crypto.scryptSync(cryptoSecret as crypto.BinaryLike, 'salt', 24);
//     private static readonly _iv = Buffer.alloc(16, 0);
//
//     /**
//      * Encrypt string
//      * @param {string} string - string to encrypt
//      * @returns {string} - hash
//      */
//     public static encrypt(string: string): string {
//         const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);
//         let encrypted = cipher.update(string, 'utf8', 'hex');
//         encrypted += cipher.final('hex');
//         return encrypted;
//     }
//
//     /**
//      * Decrypt string
//      * @param {string} encryptedString - string to decrypt
//      * @returns {string} - decrypted string
//      */
//     public static decrypt(encryptedString: string): string {
//         const decipher = crypto.createDecipheriv(this._algorithm, this._key, this._iv);
//         let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
//         decrypted += decipher.final('utf8');
//         return decrypted;
//     }
//
//     /**
//      * Hash password
//      * @param {string} password
//      * @returns {{ salt: string, hash: string }} - hash
//      */
//     public static hashPassword(password: string): HashedPasswordComponents {
//         const salt = crypto.randomBytes(32).toString('hex');
//         const saltWithPepper = this.encrypt(salt);
//         const hash = crypto.pbkdf2Sync(password, saltWithPepper, 2048, 124, 'sha512').toString('hex');
//         return { salt: saltWithPepper, hash };
//     }
//
//     /**
//      * Compare password with hashed password
//      * @param {string} password
//      * @param {string} passwordHash - hashed password
//      * @param {string} saltWithPepper - salt
//      * @returns {boolean} - equivalence of password and hashed password
//      */
//     public static verifyPassword(password: string, passwordHash: string, saltWithPepper: string): boolean {
//         const hash = crypto.pbkdf2Sync(password, saltWithPepper, 2048, 32, 'sha512').toString('hex');
//         return passwordHash === hash;
//     }
// }
