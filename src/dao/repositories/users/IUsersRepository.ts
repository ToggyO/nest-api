import type { UserOrmEntity } from 'dao/entities/user.orm-entity';

import type { IBaseRepository } from '../interfaces';

export type IUsersRepository = IBaseRepository<UserOrmEntity>;
