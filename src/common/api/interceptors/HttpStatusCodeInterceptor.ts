import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { HttpResponse } from '../models/responses';

@Injectable()
export class HttpStatusCodeInterceptor<T> implements NestInterceptor<T, HttpResponse<T>> {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse<Response>();
        return next.handle().pipe(
            map<Response, Response>((content) => {
                response.statusCode = content.statusCode;
                delete content.statusCode;
                return content;
            }),
        );
    }
}
