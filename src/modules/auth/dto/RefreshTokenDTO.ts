import { IsNotEmpty } from 'class-validator';

import { ErrorCodes } from 'common/api/errors';

export class RefreshTokenDTO {
    @IsNotEmpty({
        context: {
            code: ErrorCodes.Validation.fieldNotEmpty,
        },
    })
    public refreshToken: string;
}
