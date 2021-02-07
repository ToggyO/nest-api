import { ArgumentMetadata, ParseIntPipe } from '@nestjs/common';

import { PipeExceptionFactories } from './PipeExceptionFactories';

export class CustomParseIntPipe extends ParseIntPipe {
    constructor() {
        super({
            exceptionFactory: PipeExceptionFactories.parseIntPipeExceptionFactory,
            errorHttpStatusCode: 400,
        });
    }
    public transform(value: string, metadata: ArgumentMetadata): Promise<number> {
        return super.transform(value, metadata);
    }
}
