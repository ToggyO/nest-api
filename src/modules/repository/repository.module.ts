import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from 'dao/repositories/users/users.repository';

const repositories = TypeOrmModule.forFeature([UsersRepository]);

@Module({
    imports: [repositories],
    exports: [repositories],
})
export class RepositoryModule {}
