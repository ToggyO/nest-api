import { HttpStatus, Injectable } from '@nestjs/common';

import { ErrorResponse, NotFoundResponse, Response } from 'common/api/models/responses';
import { UserOrmEntity } from 'dao/entities/user.orm-entity';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';
import { PageModel, PaginationModel } from 'common/api/models/pagination';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserDTO } from './dto/UserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

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
            return new NotFoundResponse();
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

    public async updateUser(id: number, dto: UpdateUserDTO): Promise<Response<UserDTO>> {
        const userDto = await this._service.updateUser(id, dto);
        if (!userDto) {
            return new NotFoundResponse();
        }
        const response = new Response<UserDTO>();
        response.data = userDto;
        return response;
    }

    public async deleteUser(id: number): Promise<Response<void>> {
        await this._service.deleteUser(id);
        return new Response();
    }
}
