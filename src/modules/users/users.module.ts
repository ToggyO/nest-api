import { Module } from '@nestjs/common';

import { DI_TOKENS } from 'config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: DI_TOKENS.IUsersService,
            useFactory: () => new UsersService(),
        },
    ],
})
export class UsersModule {}
