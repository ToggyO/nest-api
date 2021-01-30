import { HttpException } from '@nestjs/common';

import { IApplicationHttpExceptionPayload } from './interfaces';

export class ApplicationHttpException extends HttpException {
    constructor(errorDto: IApplicationHttpExceptionPayload) {
        const { statusCode, ...payload } = errorDto;
        super(payload, statusCode);
    }
}