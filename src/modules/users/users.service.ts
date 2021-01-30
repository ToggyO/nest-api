import { HttpStatus } from '@nestjs/common';

import { HttpResponse, SuccessResponse } from 'common/api/responses';

import { IUsersService } from './users.interfaces';

const obj = { test: 'test' };

export class UsersService implements IUsersService {
    getTest(): HttpResponse<typeof obj> {
        const response = new SuccessResponse<typeof obj>();
        response.statusCode = HttpStatus.OK;
        response.data = obj;
        return response;
    }
}
