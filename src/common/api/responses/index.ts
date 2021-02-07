import { HttpStatus } from '@nestjs/common';

export const SUCCESS_CODE = 'success';

export class HttpResponse<T> {
    public statusCode: HttpStatus = HttpStatus.OK;
    public code = SUCCESS_CODE;
}

export class SuccessResponse<T> extends HttpResponse<T> {
    public data: T;
}

export class ErrorResponse<T> extends HttpResponse<T> {
    public message: string;
    public errors: Array<ApiError> = [];
}

export class ApiError {
    public code?: string;
    public message: string;
    public field: string | null = null;
}
