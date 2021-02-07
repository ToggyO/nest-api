import { HttpException } from '@nestjs/common';

import { IApplicationHttpExceptionDTO } from './interfaces';

export class ApplicationHttpException extends HttpException {
    constructor(errorDto: IApplicationHttpExceptionDTO) {
        const { statusCode, ...payload } = errorDto;
        super(payload, statusCode);
    }
}
