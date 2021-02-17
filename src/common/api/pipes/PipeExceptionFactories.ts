import type { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

import { ApiError } from 'common/api/models/responses';
import { ApplicationHttpException } from 'common/api/exceptions';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';
import { isObjectEmpty } from 'utils/helpers';

import type { ExtendedValidationError } from './interfaces';

export class PipeExceptionFactories {
    public static validationPipeExceptionFactory(errors: Array<ExtendedValidationError>) {
        const apiErrors = errors.map((err) => {
            const apiError = new ApiError();
            apiError.message = Object.values(err.constraints)[0];
            apiError.field = err.property;
            apiError.code = !isObjectEmpty(err.contexts) ? Object.values(err.contexts)[0]['code'] : null;
            return apiError;
        });
        return new ApplicationHttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            code: ErrorCodes.Global.badParameters,
            message: ErrorMessages.Global.badParameters,
            errors: apiErrors,
        });
    }

    public static parseIntPipeExceptionFactory(error: string): HttpException {
        return new ApplicationHttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            code: ErrorCodes.Global.badParameters,
            message: error,
            errors: [],
        });
    }
}
