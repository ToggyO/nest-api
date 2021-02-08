import { UserOrmEntity } from 'dao/entities/user.orm-entity';

import { IBaseRepository } from '../interfaces';

export type IUsersRepository = IBaseRepository<UserOrmEntity>;
