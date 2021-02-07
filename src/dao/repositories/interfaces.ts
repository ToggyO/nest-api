import { FindOneOptions } from 'typeorm';

import { PaginationModel } from 'common/models/pagination';

import { FindListParameters } from './types';

export interface IBaseRepository<Entity> {
    getList(payload: FindListParameters<Entity>): Promise<PaginationModel<Entity>>;
    getEntity({ where, select, join, order }: FindOneOptions<Entity>): Promise<Entity | null>;
    createEntity(model: Entity): Promise<Entity>;
    updateEntity(id: number, model: Entity): Promise<Entity>;
    deleteEntity(id: number): Promise<void>;
}
