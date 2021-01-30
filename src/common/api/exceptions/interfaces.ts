export interface IValidationError {
    code: string;
    message: string;
    field: string | null;
}

export interface IApplicationHttpExceptionPayload {
    statusCode: number;
    code: string;
    message: string;
    errors: Array<IValidationError>;
}
