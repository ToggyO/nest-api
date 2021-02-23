import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import type { Type } from '@nestjs/common';

import { Response } from '../../api/models/responses';

export function ApiBaseResponse<TModel extends Type<any>>(model: TModel, status = HttpStatus.OK) {
    return applyDecorators(
        ApiResponse({
            status,
            description: 'Successful operation',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(Response) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    );
}
