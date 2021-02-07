export class PageModel {
    public page = 1;
    public pageSize = 10;
}

export class PaginationModel<T> extends PageModel {
    public items: Array<T>;
    public total: number;
}
