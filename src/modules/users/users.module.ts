import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersHandler } from './users.handler';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

import { RepositoryModule } from '../repository/repository.module';

@Module({
    imports: [RepositoryModule],
    controllers: [UsersController],
    providers: [UsersHandler, UsersService, UsersMapper],
})
export class UsersModule {}
