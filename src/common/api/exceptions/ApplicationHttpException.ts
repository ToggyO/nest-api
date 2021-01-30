import { HttpException } from '@nestjs/common';

export class ApplicationHttpException extends HttpException {
    constructor() {
        super();
    }
}