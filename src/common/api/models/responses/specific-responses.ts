import { HttpStatus } from '@nestjs/common';

import { ErrorCodes, ErrorMessages } from '../../errors';

import { ErrorResponse } from './responses';

export class NotFoundResponse<T> extends ErrorResponse<T> {
    public statusCode = HttpStatus.NOT_FOUND;
    public code = ErrorCodes.Global.notFound;
    public message = ErrorMessages.Global.notFound;
}
