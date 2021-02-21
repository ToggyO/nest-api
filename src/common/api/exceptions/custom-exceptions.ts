import { HttpException, HttpStatus } from '@nestjs/common';

import type { IApplicationHttpExceptionDTO } from './interfaces';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';

export class ApplicationHttpException extends HttpException {
    constructor(errorDto: IApplicationHttpExceptionDTO) {
        const { statusCode, ...payload } = errorDto;
        super(payload, statusCode);
    }
}

export class InvalidTokenHttpException extends HttpException {
    constructor() {
        super(
            {
                code: ErrorCodes.Security.accessTokenInvalid,
                message: ErrorMessages.Security.accessTokenInvalid,
                errors: [],
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
