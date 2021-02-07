import { UserEntity } from 'domain/entities/user/user.entity';

import { CreateUserDTO } from './dto/CreateUserDTO';

export interface IUsersService {
    createDomainEntity(dto: CreateUserDTO): UserEntity;
}
