import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DI_TOKENS } from 'config';
import { ErrorResponse, HttpResponse, SuccessResponse } from 'common/api/responses';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';
import { UserOrmEntity } from 'dao/entities/user.orm-entity';
import { ErrorCodes, ErrorMessages } from 'common/api/errors';
import { PageModel, PaginationModel } from 'common/models/pagination';
import { UsersRepository } from 'dao/repositories/users/users.repository';

import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserDTO } from './dto/UserDTO';
import { IUsersService } from './users.interfaces';
import { UsersMapper } from './users.mapper';
import { BaseHandler } from '../common/base.handler';

@Injectable()
export class UsersHandler extends BaseHandler {
    constructor(
        @InjectRepository(UsersRepository) private readonly _repository: IUsersRepository,
        @Inject(DI_TOKENS.IUsersService) private readonly _service: IUsersService,
        private readonly _mapper: UsersMapper,
    ) {
        super();
    }

    public async getUsers(pageModel: PageModel): Promise<HttpResponse<PaginationModel<UserDTO>>> {
        const pagination = this._getPagination(pageModel);
        const result = await this._repository.getList({ pagination });
        const paginationModel = new PaginationModel<UserDTO>();
        paginationModel.items = this._mapper.mapToListOfDto(result.items);
        paginationModel.page = result.page;
        paginationModel.pageSize = result.pageSize;
        paginationModel.total = result.total;
        const response = new SuccessResponse<PaginationModel<UserDTO>>();
        response.data = paginationModel;
        return response;
    }

    public async getUserById(id: number): Promise<HttpResponse<UserDTO>> {
        const user = await this._repository.getEntity({ where: { id } });
        if (!user) {
            const error = new ErrorResponse<UserDTO>();
            error.statusCode = HttpStatus.NOT_FOUND;
            error.code = ErrorCodes.Global.notFound;
            error.message = ErrorMessages.Global.notFound;
            return error;
        }
        const userDto = this._mapper.mapToDto(user);
        const response = new SuccessResponse<UserDTO>();
        response.data = userDto;
        return response;
    }

    public async createUser(dto: CreateUserDTO): Promise<HttpResponse<UserDTO>> {
        const isExists = await this._repository.getEntity({ where: { email: dto.email } });
        if (isExists) {
            const error = new ErrorResponse<UserOrmEntity>();
            error.statusCode = HttpStatus.CONFLICT;
            error.code = ErrorCodes.Global.businessConflict;
            error.message = ErrorMessages.Business.emailExists;
            return error;
        }
        const domainEntity = this._service.createDomainEntity(dto);
        const user = this._mapper.mapToOrmEntity(domainEntity);
        const createdOrmEntity = await this._repository.createEntity(user);
        const userDto = this._mapper.mapToDto(createdOrmEntity);
        const response = new SuccessResponse<UserDTO>();
        response.data = userDto;
        return response;
    }
}
