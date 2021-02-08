import { EntityRepository, FindOneOptions } from 'typeorm';

import { UserOrmEntity } from 'dao/entities/user.orm-entity';
import { PaginationModel } from 'common/api/models/pagination';

import { IUsersRepository } from './IUsersRepository';
import { BaseRepository } from '../base.repository';
import { FindListParameters } from '../types';

@EntityRepository(UserOrmEntity)
export class UsersRepository extends BaseRepository<UserOrmEntity> implements IUsersRepository {
    public async getList({
        where = {},
        select,
        join,
        order,
        pagination,
    }: FindListParameters<UserOrmEntity>): Promise<PaginationModel<UserOrmEntity>> {
        const [items, count] = await this.findAndCount({
            where,
            select,
            join,
            order,
            ...pagination,
        });
        const result = this.getPaginationResponse<UserOrmEntity>(count, pagination);
        result.items = items;
        return result;
    }

    public async getEntity({
        where = {},
        select,
        join,
        order,
    }: FindOneOptions<UserOrmEntity>): Promise<UserOrmEntity | null> {
        const entity = await this.findOne({ where, select, join, order });
        if (!entity) {
            return null;
        }
        return entity;
    }

    public async createEntity(model: UserOrmEntity): Promise<UserOrmEntity> {
        return this.save(model);
    }

    public async updateEntity(id: number, model: UserOrmEntity): Promise<UserOrmEntity> {
        await this.update(id, model);
        return this.getEntity({ where: { id } });
    }

    public async deleteEntity(id: number): Promise<void> {
        await this.delete(id);
    }
}
