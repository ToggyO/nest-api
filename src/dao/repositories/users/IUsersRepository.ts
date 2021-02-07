import { UserOrmEntity } from 'dao/entities/user.orm-entity';

import { IBaseRepository } from '../interfaces';

export interface IUsersRepository extends IBaseRepository<UserOrmEntity> {}
