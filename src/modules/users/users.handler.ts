import { HttpStatus, Injectable } from '@nestjs/common';

import { ErrorResponse, Response } from 'common/api/models/responses';
import { UserOrmEntity } from 'dao/entities/user.orm-entity';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';
import { PageModel, PaginationModel } from 'common/api/models/pagination';

import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserDTO } from './dto/UserDTO';
import { UsersService } from './users.service';

@Injectable()
export class UsersHandler {
    constructor(private readonly _service: UsersService) {}

    public async getUsers(pageModel: PageModel): Promise<Response<PaginationModel<UserDTO>>> {
        const result = await this._service.getUsers(pageModel);
        const response = new Response<PaginationModel<UserDTO>>();
        response.data = result;
        return response;
    }

    public async getUserById(id: number): Promise<Response<UserDTO>> {
        const userDto = await this._service.getUser(id);
        if (!userDto) {
            const error = new ErrorResponse<UserDTO>();
            error.statusCode = HttpStatus.NOT_FOUND;
            error.code = ErrorCodes.Global.notFound;
            error.message = ErrorMessages.Global.notFound;
            return error;
        }
        const response = new Response<UserDTO>();
        response.data = userDto;
        return response;
    }

    public async createUser(dto: CreateUserDTO): Promise<Response<UserDTO>> {
        const userDto = await this._service.createUser(dto);
        if (!userDto) {
            const error = new ErrorResponse<UserOrmEntity>();
            error.statusCode = HttpStatus.CONFLICT;
            error.code = ErrorCodes.Global.businessConflict;
            error.message = ErrorMessages.Business.emailExists;
            return error;
        }
        const response = new Response<UserDTO>();
        response.data = userDto;
        return response;
    }
}
