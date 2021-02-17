import { Repository } from 'typeorm';

import { isObjectEmpty } from 'utils/helpers';
import { PaginationModel } from 'common/api/models/pagination';

import type { TypeOrmPagination } from './types';

export class BaseRepository<T> extends Repository<T> {
    /**
     * Pagination response format
     */
    public getPaginationResponse<TModel>(count: number, pagination: TypeOrmPagination): PaginationModel<TModel> {
        if (isObjectEmpty(pagination)) {
            return {} as PaginationModel<TModel>;
        }
        const result = new PaginationModel<TModel>();
        result.page = Math.abs(pagination.skip / pagination.take) + 1;
        result.pageSize = pagination.take;
        result.total = count || 0;
        return result;
    }
}
