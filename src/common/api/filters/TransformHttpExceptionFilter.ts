import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { ErrorResponse } from 'common/api/models/responses';
import { ErrorCodes } from 'common/api/errors';

@Catch(HttpException)
export class TransformHttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionDto = exception.getResponse() as ErrorResponse<any>;

        const errorResponse = new ErrorResponse();
        delete errorResponse.statusCode;
        errorResponse.code = exceptionDto.code || this._getErrorResponseCode(exceptionDto.statusCode);
        errorResponse.message = exceptionDto.message;
        errorResponse.errors = exceptionDto.errors || [];

        response.status(status).json(errorResponse);
    }

    // TODO: дополнить
    private _getErrorResponseCode(statusCode: HttpStatus): string {
        switch (statusCode) {
            case HttpStatus.BAD_REQUEST:
                return ErrorCodes.Global.badParameters;
            case HttpStatus.FORBIDDEN:
                return ErrorCodes.Global.forbidden;
            default:
                return ErrorCodes.System.internalServerError;
        }
    }
}
