import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import type { Type } from '@nestjs/common';

import { Response } from '../../api/models/responses';
import { PaginationModel } from '../../api/models/pagination';

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel, status = HttpStatus.OK) {
    return applyDecorators(
        ApiOkResponse({
            status,
            description: 'Successful operation',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(Response) },
                    {
                        properties: {
                            data: {
                                allOf: [
                                    { $ref: getSchemaPath(PaginationModel) },
                                    {
                                        properties: {
                                            items: {
                                                type: 'array',
                                                items: { $ref: getSchemaPath(model) },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        }),
    );
}
