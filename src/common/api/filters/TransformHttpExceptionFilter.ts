import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponse } from 'common/api/responses';
import { ErrorCodes } from 'common/api/errors';

@Catch(HttpException)
export class TransformHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionDto = exception.getResponse() as ErrorResponse<any>;

        const errorResponse = new ErrorResponse();
        delete errorResponse.statusCode;
        errorResponse.code = exceptionDto.code || ErrorCodes.Global.badParameters;
        errorResponse.message = exceptionDto.message;
        errorResponse.errors = exceptionDto.errors || [];

        response.status(status).json(errorResponse);
    }
}
