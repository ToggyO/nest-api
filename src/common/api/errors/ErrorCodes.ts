export class ErrorCodes {
    public static Global = {
        businessConflict: 'business_conflict',
        unprocessableEntity: 'unprocessable_entity',
        badParameters: 'bad_parameters',
        notFound: 'not_found',
        permissionDenied: 'Permission denied',
    };

    public static Common = {
        fieldNotBlank: 'common.field_not_blank',
        fieldSizeMax: 'common.field_size_max',
        fieldSizeMin: 'common.field_size_min',
        fieldInvalidLength: 'common.field_invalid_length',
        fieldNotValidChars: 'common.field_not_valid_chars',
        fieldMax: 'common.field_max',
        fieldMin: 'common.field_min',
        fieldFuture: 'common.field_future',
        fieldPast: 'common.field_past',
        fieldEmail: 'common.field_email',
        fieldCardNumber: 'common.field_card_number',
        fieldPhone: 'common.field_phone',
        fieldDuplicate: 'common.field_duplicate',
    };

    public static Security = {
        unauthorized: 'security_error',
        forbidden: 'forbidden',
        fieldAccessToken: 'accessToken',
        authDataInvalid: 'sec.auth_data_invalid',
        tokenInvalid: 'sec.token_invalid',
        accessTokenInvalid: 'sec.access_token_invalid',
        accessTokenExpired: 'sec.access_token_expired',
        googleTokenInvalid: 'sec.google_token_invalid',
        refreshTokenInvalid: 'sec.refresh_token_invalid',
        refreshTokenExpired: 'sec.refresh_token_expired',
        inviteInvalid: 'sec.invite_invalid',
        confirmationCodeInvalid: 'sec.confirmation_code_invalid',
    };

    public static Business = {
        emailExists: 'bus.email_already_exists',
        invalidEmail: 'bus.invalid_email',
        userDoesNotExists: 'bus.user_does_not_exists',
        userIsDeleted: 'bus.user_is_deleted',
        userIsBlocked: 'bus.user_is_blocked',
        invalidRegistrationStep: 'bus.invalid_registration_step',
        passwordChangeRequestInvalid: 'bus.password_change_request_invalid',
    };

    public static System = {
        internalServerError: 'internal_server_error',
    };
}

// declare namespace ErrorCodes {
//     export class Global {
//         public static readonly success = 'success';
//         public static readonly businessConflict = 'business_conflict';
//         public static readonly unprocessableEntity = 'unprocessable_entity';
//         public static readonly badParameters = 'bad_parameters';
//         public static readonly notFound = 'not_found';
//         public static readonly permissionError = 'permission_error';
//     }
//
//     export class Common {
//         public static readonly fieldNotBlank = 'common.field_not_blank';
//         public static readonly fieldSizeMax = 'common.field_size_max';
//         public static readonly fieldSizeMin = 'common.field_size_min';
//         public static readonly fieldInvalidLength = 'common.field_invalid_length';
//         public static readonly fieldNotValidChars = 'common.field_not_valid_chars';
//         public static readonly fieldMax = 'common.field_max';
//         public static readonly fieldMin = 'common.field_min';
//         public static readonly fieldFuture = 'common.field_future';
//         public static readonly fieldPast = 'common.field_past';
//         public static readonly fieldEmail = 'common.field_email';
//         public static readonly fieldCardNumber = 'common.field_card_number';
//         public static readonly fieldPhone = 'common.field_phone';
//         public static readonly fieldDuplicate = 'common.field_duplicate';
//     }
//
//     export class Security {
//         public static readonly unauthorized = 'security_error';
//         public static readonly permissionDenied = 'permission_error';
//         public static readonly forbidden = 'forbidden';
//         public static readonly fieldAccessToken = 'accessToken';
//         public static readonly authDataInvalid = 'sec.auth_data_invalid';
//         public static readonly tokenInvalid = 'sec.token_invalid';
//         public static readonly accessTokenInvalid = 'sec.access_token_invalid';
//         public static readonly accessTokenExpired = 'sec.access_token_expired';
//         public static readonly googleTokenInvalid = 'sec.google_token_invalid';
//         public static readonly refreshTokenInvalid = 'sec.refresh_token_invalid';
//         public static readonly refreshTokenExpired = 'sec.refresh_token_expired';
//         public static readonly inviteInvalid = 'sec.invite_invalid';
//         public static readonly confirmationCodeInvalid = 'sec.confirmation_code_invalid';
//     }
//
//     export class Business {
//         public static readonly emailExists = 'bus.email_already_exists';
//         public static readonly invalidEmail = 'bus.invalid_email';
//         public static readonly userDoesNotExists = 'bus.user_does_not_exists';
//         public static readonly userIsDeleted = 'bus.user_is_deleted';
//         public static readonly userIsBlocked = 'bus.user_is_blocked';
//         public static readonly invalidRegistrationStep = 'bus.invalid_registration_step';
//         public static readonly passwordChangeRequestInvalid = 'bus.password_change_request_invalid';
//     }
//
//     export class System {
//         public static readonly internalServerError = 'internal_server_error';
//     }
// }
