import type { SwaggerDocumentOptions } from '@nestjs/swagger';

import { Response, ErrorResponse, ApiError } from '../api/models/responses';
import { PageModel, PaginationModel } from '../api/models/pagination';

export const swaggerApiOptions = {
    extraModels: [Response, ErrorResponse, ApiError, PageModel, PaginationModel],
} as SwaggerDocumentOptions;
