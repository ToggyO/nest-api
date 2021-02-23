import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export function ApiSuccessfulOperation() {
    return applyDecorators(ApiOkResponse({ description: 'Successful operation' }));
}
