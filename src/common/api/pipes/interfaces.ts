import { ValidationError } from '@nestjs/common';

export interface ExtendedValidationError extends ValidationError {
    contexts: Record<string, any>;
}
