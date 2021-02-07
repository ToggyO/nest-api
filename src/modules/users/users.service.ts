import { UserEntity } from 'domain/entities/user/user.entity';

import { CreateUserDTO } from './dto/CreateUserDTO';
import { IUsersService } from './users.interfaces';

export class UsersService implements IUsersService {
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
