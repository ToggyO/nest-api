import { Controller, Get, HttpStatus, Inject, ParseBoolPipe, Query } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import { ErrorResponse, HttpResponse } from 'common/api/responses';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';

import { IUsersService } from './users.interfaces';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(DI_TOKENS.IUsersService)
        private readonly _usersService: IUsersService,
    ) {}

    // FIXME: delete
    @Get('test')
    public handleTest(@Query('throwError', ParseBoolPipe) throwError: boolean): HttpResponse<any> {
        if (throwError) {
            const response = new ErrorResponse();
            response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response.code = ErrorCodes.System.internalServerError;
            response.message = ErrorMessages.System.internalServerError;
            response.errors = [];
            return response;
        }
        return this._usersService.getTest();
    }
}
