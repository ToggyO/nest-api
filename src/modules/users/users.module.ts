import { Module } from '@nestjs/common';

import { DI_TOKENS } from 'config';

import { UsersController } from './users.controller';
import { UsersHandler } from './users.handler';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

import { RepositoryModule } from '../repository/repository.module';

@Module({
    imports: [RepositoryModule],
    controllers: [UsersController],
    providers: [
        UsersHandler,
        UsersMapper,
        {
            provide: DI_TOKENS.IUsersService,
            useFactory: () => new UsersService(),
        },
    ],
})
export class UsersModule {}
