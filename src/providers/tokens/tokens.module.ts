import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DI_TOKENS } from 'config';

import { TokensService } from './tokens.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DI_TOKENS.ITokensService,
            useClass: TokensService,
        },
    ],
    exports: [DI_TOKENS.ITokensService],
})
export class TokensModule {}
