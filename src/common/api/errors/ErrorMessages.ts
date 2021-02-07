export class ErrorMessages {
    public static Global = {
        businessConflict: 'Business conflict',
        unprocessableEntity: 'Invalid entity or business request',
        badParameters: 'Bad parameters',
        notFound: 'Not found',
        permissionDenied: 'Permission denied',
        unauthorized: 'Unauthorized',
        forbidden: 'Forbidden',
        fieldInvalid: 'Invalid field',
    };

    public static Validation = {
        fieldNotEmpty: "The field can't be empty",
        fieldSizeMax: 'The field is too long',
        fieldSizeMin: 'The field is too short',
        fieldInvalidLength: 'The field length is not correct',
        fieldNotValidChars: 'The field contains invalid characters',
        fieldMax: (maxNumber: number) => `The number can't be greater than ${maxNumber}`,
        fieldMin: (minNumber: number) => `The number can't be less than ${minNumber}`,
        fieldFuture: (maxDate: string) => `The date should be later than ${maxDate}`,
        fieldPast: (minDate: string) => `The date should be early than ${minDate}`,
        fieldEmail: "Email isn't valid",
        fieldCardNumber: "Card number isn't valid",
        fieldPhone: "The phone number isn't valid",
        fieldDuplicate: 'The field value should be unique',
    };

    public static Security = {
        authDataInvalid: 'Auth data invalid',
        tokenInvalid: 'Token invalid',
        accessTokenInvalid: 'Access token invalid',
        accessTokenExpired: 'Access token expired',
        refreshTokenInvalid: 'Refresh token invalid',
        refreshTokenExpired: 'Refresh token expired',
        confirmationCodeInvalid: 'Code is invalid',
    };

    public static Business = {
        emailExists: 'This email is already registered. Sign in or use different email to register',
        invalidEmail: 'Email is invalid',
        userDoesNotExists: 'UserOrmEntity does not exists',
        userIsDeleted: "You don't have access to system - your account is deleted",
        userIsBlocked: "You don't have access to system - your account is blocked",
        passwordChangeRequestInvalid: 'Password change request is invalid',
        PasswordChangeCodeInvalid: 'Code for change password invalid',
    };

    public static System = {
        internalServerError: 'Internal server error',
    };
}
