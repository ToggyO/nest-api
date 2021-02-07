import { PageModel } from 'common/models/pagination';
import { TypeOrmPagination } from 'dao/repositories/types';

export class BaseHandler {
    protected _getPagination(pageModel: PageModel): TypeOrmPagination {
        let page = +parseInt(pageModel.page.toString());
        let pageSize = +parseInt(pageModel.pageSize.toString());
        if (Number.isNaN(page) || page <= 0) {
            page = 1;
        }
        if (Number.isNaN(pageSize) || pageSize <= 0) {
            pageSize = 10;
        }
        return {
            skip: (page - 1) * pageSize,
            take: pageSize,
        };
    }
}
