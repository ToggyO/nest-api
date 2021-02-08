import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'modules/common/base.service';
import { UserEntity } from 'domain/entities/user/user.entity';
import { PageModel, PaginationModel } from 'common/api/models/pagination';
import { UsersRepository } from 'dao/repositories/users/users.repository';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';

import { CreateUserDTO } from './dto/CreateUserDTO';
import { UserDTO } from './dto/UserDTO';
import { UsersMapper } from './users.mapper';

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
