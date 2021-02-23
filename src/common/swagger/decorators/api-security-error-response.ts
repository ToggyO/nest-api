import { HttpStatus } from '@nestjs/common';

import { ApiErrorResponse } from 'common/swagger';

export function ApiSecurityErrorResponse() {
    return ApiErrorResponse(HttpStatus.UNAUTHORIZED, 'Auth data invalid');
}
