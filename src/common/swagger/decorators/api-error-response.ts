import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ErrorMessages } from 'common/api/errors';
import { ApiError, ErrorResponse } from 'common/api/models/responses';

const API_DESCRIPTION = {
    [HttpStatus.BAD_REQUEST]: ErrorMessages.Global.badParameters,
    [HttpStatus.UNAUTHORIZED]: ErrorMessages.Global.unauthorized,
    [HttpStatus.FORBIDDEN]: ErrorMessages.Global.forbidden,
    [HttpStatus.NOT_FOUND]: ErrorMessages.Global.notFound,
    [HttpStatus.CONFLICT]: ErrorMessages.Global.businessConflict,
    [HttpStatus.UNPROCESSABLE_ENTITY]: ErrorMessages.Global.unprocessableEntity,
} as Record<HttpStatus, string>;

export function ApiErrorResponse(status: HttpStatus, description?: string) {
    return applyDecorators(
        ApiResponse({
            status,
            description: description || API_DESCRIPTION[status],
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ErrorResponse) },
                    {
                        properties: {
                            errors: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ApiError) },
                            },
                        },
                    },
                ],
            },
        }),
    );
}
