import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DI_TOKENS } from 'config';
import { IUsersRepository } from 'dao/repositories/users/IUsersRepository';
import { UserEntity } from 'domain/entities/user/user.entity';
import { ITokensService } from 'providers/tokens';
import { IRedisProvider } from 'providers/redis';
import { Generator } from 'utils/generator';

import { UsersMapper } from '../users/users.mapper';
import type { UserDTO } from '../users/dto';

import { AuthDTO } from './dto';
import type { CredentialsDTO } from './dto';
import type { CreateAuthDtoOptions } from './auth.types';

@Injectable()
export class AuthService {
    private readonly _redisKeyExpire: number;

    constructor(
        private readonly _configService: ConfigService,
        @Inject(DI_TOKENS.IUsersRepository) private readonly _repository: IUsersRepository,
        @Inject(DI_TOKENS.ITokensService) private readonly _tokensService: ITokensService,
        @Inject(DI_TOKENS.IRedisProvider) private readonly _redisProvider: IRedisProvider,
        private readonly _mapper: UsersMapper,
    ) {
        this._redisKeyExpire = this._configService.get<number>('REFRESH_LIFETIME');
    }

    public async checkAuthCredentials(dto: CredentialsDTO, saveToRedis?: boolean): Promise<AuthDTO | null> {
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
        return this.createAuthDto(this._mapper.mapToDto(userOrmEntity), { saveToRedis });
    }

    public async createAuthDto(userDto: UserDTO, options?: CreateAuthDtoOptions): Promise<AuthDTO> {
        const resultGuid = options.existedGuid || Generator.generateUuidV4();
        const authDto = new AuthDTO();
        authDto.user = userDto;
        authDto.tokens = this._tokensService.createTokenDto(resultGuid);
        if (options.saveToRedis) {
            await this._redisProvider.serializeAndSetWithExpirationAsync<AuthDTO>(
                resultGuid,
                authDto,
                this._redisKeyExpire,
            );
        }
        return authDto;
    }

    public async validateToken<T>(refreshToken: string): Promise<T | null> {
        const payload = await this._tokensService.checkTokenAsync<T>(refreshToken);
        if (!payload) {
            return null;
        }
        return payload;
    }

    public async checkRefreshTokenEquality(guid: string, refreshToken: string): Promise<AuthDTO | null> {
        const { tokens, user } = await this._redisProvider.getAndDeserializeAsync<AuthDTO>(guid);
        if (!tokens || tokens.refreshToken !== refreshToken) {
            return null;
        }
        return { tokens, user };
    }
}
