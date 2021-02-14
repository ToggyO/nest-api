import { Module } from '@nestjs/common';

import { TokensModule } from 'providers/tokens';

import { AuthController } from './auth.controller';
import { AuthHandler } from './auth.handler';
import { AuthService } from './auth.service';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [RepositoryModule, TokensModule, UsersModule],
    controllers: [AuthController],
    providers: [AuthHandler, AuthService],
})
export class AuthModule {}
