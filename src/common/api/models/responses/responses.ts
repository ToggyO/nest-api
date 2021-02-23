import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SUCCESS_CODE = 'success';

export class HttpResponse<T> {
    public statusCode: HttpStatus = HttpStatus.OK;

    @ApiProperty()
    public code: string = SUCCESS_CODE;
}

export class Response<T> extends HttpResponse<T> {
    public data: T;
}

export class ErrorResponse<T> extends Response<T> {
    @ApiProperty()
    public message: string;
    public errors: Array<ApiError> = [];
}

export class ApiError {
    @ApiProperty()
    public code?: string;

    @ApiProperty()
    public message: string;

    @ApiProperty()
    public field: string | null = null;
}
