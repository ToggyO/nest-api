import { NoInferType } from '@nestjs/config';
import { Callback, KeyType, Ok } from 'ioredis';

export interface IRedisProvider {
    serializeAndSet<T>(key: KeyType, value: T, cb?: Callback<Ok>): void;
    serializeAndSetAsync<T>(key: KeyType, value: T): Promise<Ok | null>;
    serializeAndSetWithExpiration<T>(key: string, value: T, expire?: number, cb?: Callback<Ok>): void;
    serializeAndSetWithExpirationAsync<T>(key: string, value: T, expire: number): Promise<Ok | null>;
    getAndDeserializeAsync<T>(key: KeyType): Promise<T>;
    getAndDeserializeAsync<T>(key: KeyType, defaultValue: NoInferType<T>): Promise<T>;
    delete(key: KeyType, cb: Callback<number>): void;
    deleteAsync(key: KeyType): Promise<void>;
}
