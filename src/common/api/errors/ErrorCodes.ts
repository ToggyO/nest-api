export class ErrorCodes {
    public static Global = {
        businessConflict: 'business_conflict',
        unprocessableEntity: 'unprocessable_entity',
        badParameters: 'bad_parameters',
        notFound: 'not_found',
        permissionDenied: 'permission_denied',
        unauthorized: 'security_error',
        forbidden: 'forbidden',
    };

    public static Validation = {
        fieldInvalidType: 'validation.field_invalid_type',
        fieldNotEmpty: 'validation.field_not_empty',
        fieldSizeMax: 'validation.field_size_max',
        fieldSizeMin: 'validation.field_size_min',
        fieldInvalidLength: 'validation.field_invalid_length',
        fieldNotValidChars: 'validation.field_not_valid_chars',
        fieldMax: 'validation.field_max',
        fieldMin: 'validation.field_min',
        fieldFuture: 'validation.field_future',
        fieldPast: 'validation.field_past',
        fieldEmail: 'validation.field_email',
        fieldCardNumber: 'validation.field_card_number',
        fieldPhone: 'validation.field_phone',
        fieldDuplicate: 'validation.field_duplicate',
    };

    public static Security = {
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
