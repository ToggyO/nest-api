import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ErrorCodes } from 'common/api/errors';

export class CredentialsDTO {
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
    @IsString({
        context: {
            code: ErrorCodes.Validation.fieldInvalidType,
        },
    })
    public password: string;

    // @Matches(/^[0-9a-zA-Z~!@#$%^&*_\-+=`|(){}[\]:;"'<>,.?/]+$/, {
    //     context: {
    //         code: ErrorCodes.Validation.,
    //     },
    // })
}
