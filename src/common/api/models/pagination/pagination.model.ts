import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageModel {
    @ApiPropertyOptional()
    public page = 1;

    @ApiPropertyOptional()
    public pageSize = 10;
}

export class PaginationModel<T> extends PageModel {
    @ApiProperty()
    public total: number;

    public items: Array<T>;
}
