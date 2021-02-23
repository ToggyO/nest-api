import { IsEmail, IsNotEmpty } from 'class-validator';

import { ErrorCodes } from 'common/api/errors';

export class CreateUserDTO {
    @IsNotEmpty({
        context: {
            code: ErrorCodes.Validation.fieldNotEmpty,
        },
    })
    public firstName: string;

    @IsNotEmpty({
        context: {
            code: ErrorCodes.Validation.fieldNotEmpty,
        },
    })
    public lastName: string;

    @IsEmail(
        {},
        {
            context: {
                code: ErrorCodes.Validation.fieldEmail,
            },
        },
    )
    public email: string;

    @IsNotEmpty({
        context: {
            code: ErrorCodes.Validation.fieldNotEmpty,
        },
    })
    public password: string;
}
