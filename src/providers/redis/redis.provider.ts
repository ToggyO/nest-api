import { Injectable } from '@nestjs/common';
import type { NoInferType } from '@nestjs/config';
import type { Ok, Redis, Callback, KeyType } from 'ioredis';
import { RedisService } from 'nestjs-redis';

import { autobind } from 'utils/helpers';

import type { IRedisProvider } from './redis.interfaces';

@Injectable()
export class RedisProvider implements IRedisProvider {
    private readonly _redisClient: Redis;

    constructor(_redisService: RedisService) {
        autobind(this);
        this._redisClient = _redisService.getClient();
    }

    /**
     * Save an arbitrary data type in redis
     */
    public serializeAndSet<T>(key: KeyType, value: T, cb: Callback<Ok>): void {
        return this._redisClient.set(key, JSON.stringify(value), cb);
    }

    /**
     * Save asynchronously an arbitrary data type in redis
     */
    public async serializeAndSetAsync<T>(key: KeyType, value: T): Promise<Ok | null> {
        return this._redisClient.set(key, JSON.stringify(value));
    }

    /**
     * Save an arbitrary data type in redis. Key will be deleted after life expiration time.
     */
    public serializeAndSetWithExpiration<T>(key: string, value: T, expire: number, cb: Callback<Ok>): void {
        if (!expire) {
            expire = 60 * 60 * 24;
        }
        return this._redisClient.set(key, JSON.stringify(value), 'EX', expire, cb);
    }

    /**
     * Save asynchronously an arbitrary data type in redis. Key will be deleted after life expiration time.
     */
    public async serializeAndSetWithExpirationAsync<T>(key: string, value: T, expire: number): Promise<Ok | null> {
        if (!expire) {
            expire = 60 * 60 * 24;
        }
        return this._redisClient.set(key, JSON.stringify(value), 'EX', expire);
    }

    /**
     * Read asynchronously an arbitrary data type in redis
     */
    public getAndDeserializeAsync<T>(key: KeyType): Promise<T>;
    public getAndDeserializeAsync<T>(key: KeyType, defaultValue: NoInferType<T>): Promise<T>;
    public async getAndDeserializeAsync<T>(key: KeyType, defaultValue?: T): Promise<T> {
        const serializedValue = await this._redisClient.get(key);
        if (serializedValue) {
            let result: T;
            try {
                result = JSON.parse(serializedValue);
            } catch (error) {
                result = defaultValue as T;
            }
            return result;
        }
        return defaultValue as T;
    }

    /**
     * Delete an arbitrary data type in redis
     */
    public delete(key: KeyType, cb: Callback<number>): void {
        if (!key) {
            return;
        }
        this._redisClient.del(key, cb);
    }

    /**
     * Delete asynchronously an arbitrary data type in redis
     */
    public async deleteAsync(key: KeyType): Promise<void> {
        if (!key) {
            return;
        }
        await this._redisClient.del(key);
    }
}
