import { Injectable, Inject } from '@nestjs/common';

import { DI_TOKENS } from 'config';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';
import { UserEntity } from 'domain/entities/user/user.entity';
import { ITokensService } from 'providers/tokens';
import { IRedisProvider } from 'providers/redis';

import { UsersMapper } from '../users/users.mapper';
import type { UserDTO } from '../users/dto';

import { AuthDTO } from './dto';
import type { CredentialsDTO } from './dto';
import type { RefreshTokenPayload } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        @Inject(DI_TOKENS.IUsersRepository) private readonly _repository: IUsersRepository,
        @Inject(DI_TOKENS.ITokensService) private readonly _tokensService: ITokensService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
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
        return this.createAuthDto(this._mapper.mapToDto(userOrmEntity));
    }

    public createAuthDto(userDto: UserDTO): AuthDTO {
        const authDto = new AuthDTO();
        authDto.user = userDto;
        authDto.tokens = this._tokensService.createTokenDto(userDto.id);
        return authDto;
    }

    public async validateRefreshToken(refreshToken: string): Promise<RefreshTokenPayload | null> {
        const payload = await this._tokensService.checkTokenAsync<RefreshTokenPayload>(refreshToken);
        if (!payload) {
            return null;
        }
        return payload;
    }
}
