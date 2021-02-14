import { HttpStatus } from '@nestjs/common';

import { ErrorCodes, ErrorMessages } from '../../errors';

import type { ApiError } from './responses';
import { ErrorResponse } from './responses';

export class NotFoundResponse<T> extends ErrorResponse<T> {
    public statusCode = HttpStatus.NOT_FOUND;
    public code = ErrorCodes.Global.notFound;
    public message = ErrorMessages.Global.notFound;
}

export class SecurityErrorResponse<T> extends ErrorResponse<T> {
    public statusCode = HttpStatus.UNAUTHORIZED;
    public code = ErrorCodes.Security.authDataInvalid;
    public message = ErrorMessages.Security.authDataInvalid;
    constructor(errors?: Array<ApiError>) {
        super();
        if (errors) {
            this.errors = errors;
        }
    }
}
