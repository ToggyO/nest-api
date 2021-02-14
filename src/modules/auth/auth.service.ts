import { Injectable, Inject } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';
import { UserEntity } from 'domain/entities/user/user.entity';
import { UsersMapper } from 'modules/users/users.mapper';
import type { CredentialsDTO } from 'modules/auth/dto';
import { ITokensService } from 'providers/tokens';
import { AuthDTO } from 'modules/auth/dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(DI_TOKENS.IUsersRepository) private readonly _repository: IUsersRepository,
        @Inject(DI_TOKENS.ITokensService) private readonly _tokensService: ITokensService,
        private readonly _mapper: UsersMapper,
    ) {}

    public async checkAuthCredentials(dto: CredentialsDTO): Promise<AuthDTO | null> {
        const userOrmEntity = await this._repository.getEntity({
            where: { email: dto.email },
        });
        if (!userOrmEntity) {
            return null;
        }
        const { passwordHash, salt } = userOrmEntity;
        const isPasswordValid = UserEntity.verifyPassword(dto.password, passwordHash, salt);
        if (!isPasswordValid) {
            return null;
        }
        const authDto = new AuthDTO();
        authDto.user = this._mapper.mapToDto(userOrmEntity);
        authDto.tokens = this._tokensService.createTokenDto(userOrmEntity);
        return authDto;
    }
}
