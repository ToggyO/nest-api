import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { DI_TOKENS } from 'config';
import { UsersRepository } from 'dao/repositories/users/users.repository';

@Module({
    providers: [
        {
            provide: DI_TOKENS.IUsersRepository,
            useFactory: (connection: Connection) => connection.getCustomRepository(UsersRepository),
            inject: [Connection],
        },
    ],
    exports: [DI_TOKENS.IUsersRepository],
})
export class RepositoryModule {}
