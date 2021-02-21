import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisClientModule } from 'providers/redis';

import { UsersController } from './users.controller';
import { UsersHandler } from './users.handler';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

import { RepositoryModule } from '../repository/repository.module';

@Module({
    imports: [RepositoryModule, ConfigModule, RedisClientModule],
    controllers: [UsersController],
    providers: [UsersHandler, UsersService, UsersMapper],
    exports: [UsersService, UsersMapper],
})
export class UsersModule {}
