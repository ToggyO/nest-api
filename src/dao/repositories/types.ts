import type { FindManyOptions } from 'typeorm';

export type TypeOrmPagination = {
    skip: number;
    take: number;
};

export type FindListParameters<Entity> = FindManyOptions<Entity> & { pagination?: TypeOrmPagination };
