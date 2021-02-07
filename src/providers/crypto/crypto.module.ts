import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DI_TOKENS } from 'config';

import { CryptoService } from './crypto.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DI_TOKENS.ICryptoService,
            useClass: CryptoService,
        },
    ],
    exports: [DI_TOKENS.ICryptoService],
})
export class CryptoModule {}
