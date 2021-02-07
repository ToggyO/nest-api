import { Injectable } from '@nestjs/common';

import { IUser } from 'domain/entities/user/IUser';
import { UserOrmEntity } from 'dao/entities/user.orm-entity';

import { UserDTO } from './dto/UserDTO';
import { IMapper } from '../mapper/IMapper';

// TODO: check possibility to add AutoMapper
@Injectable()
export class UsersMapper implements IMapper<IUser, UserOrmEntity, UserDTO> {
    public mapToListOfDto(list: Array<UserOrmEntity>): Array<UserDTO> {
        return list.map((user) => this.mapToDto(user));
    }

    public mapToDto(model: UserOrmEntity): UserDTO {
        const userDto = new UserDTO();
        userDto.id = model.id;
        userDto.firstName = model.firstName;
        userDto.lastName = model.lastName;
        userDto.email = model.email;
        userDto.role = model.role;
        userDto.avatar = model.avatar;
        return userDto;
    }

    public mapToOrmEntity(entity: IUser): UserOrmEntity {
        const user = new UserOrmEntity();
        user.firstName = entity.firstName;
        user.lastName = entity.lastName;
        user.email = entity.email;
        user.passwordHash = entity.passwordHash;
        user.salt = entity.salt;
        user.avatar = entity.avatar;
        user.role = entity.role;
        if (entity.id) {
            user.id = entity.id;
        }
        return user;
    }
}
