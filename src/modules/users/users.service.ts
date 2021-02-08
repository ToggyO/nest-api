import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'modules/common/base.service';
import { UserEntity } from 'domain/entities/user/user.entity';
import { PageModel, PaginationModel } from 'common/api/models/pagination';
import { UsersRepository } from 'dao/repositories/users/users.repository';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';

import { UsersMapper } from './users.mapper';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserDTO } from './dto/UserDTO';
import { UpdateUserDTO } from 'modules/users/dto/UpdateUserDTO';

@Injectable()
export class UsersService extends BaseService {
    constructor(
        @InjectRepository(UsersRepository) private readonly _repository: IUsersRepository,
        private readonly _mapper: UsersMapper,
    ) {
        super();
    }

    public async getUsers(pageModel: PageModel): Promise<PaginationModel<UserDTO>> {
        const pagination = this._getPagination(pageModel);
        const result = await this._repository.getList({ pagination });
        const paginationModel = new PaginationModel<UserDTO>();
        paginationModel.items = this._mapper.mapToListOfDto(result.items);
        paginationModel.page = result.page;
        paginationModel.pageSize = result.pageSize;
        paginationModel.total = result.total;
        return paginationModel;
    }

    public async getUser(id: number): Promise<UserDTO | null> {
        const user = await this._repository.getEntity({ where: { id } });
        if (!user) {
            return null;
        }
        return this._mapper.mapToDto(user);
    }

    public async createUser(dto: CreateUserDTO): Promise<UserDTO | null> {
        const isExists = await this._repository.getEntity({ where: { email: dto.email } });
        if (isExists) {
            return null;
        }
        const domainEntity = this.createDomainEntity(dto);
        const user = this._mapper.mapToOrmEntity(domainEntity);
        const createdOrmEntity = await this._repository.createEntity(user);
        return this._mapper.mapToDto(createdOrmEntity);
    }

    public async updateUser(id: number, dto: UpdateUserDTO): Promise<UserDTO | null> {
        const user = await this._repository.getEntity({ where: { id } });
        if (!user) {
            return null;
        }
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        const userEntity = await this._repository.updateEntity(id, user);
        return this._mapper.mapToDto(userEntity);
    }

    public deleteUser(id: number): Promise<void> {
        return this._repository.deleteEntity(id);
    }

    public createDomainEntity(dto: CreateUserDTO): UserEntity {
        const userEntity = new UserEntity();
        const { salt, hash } = userEntity.createSaltAndHash(dto.password);
        userEntity.firstName = dto.firstName;
        userEntity.lastName = dto.lastName;
        userEntity.email = dto.email;
        userEntity.salt = salt;
        userEntity.passwordHash = hash;
        return userEntity;
    }
}
