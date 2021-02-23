export type AccessTokenPayload = { guid: string };

export type RefreshTokenPayload = { guid: string };

export type CreateAuthDtoOptions = { existedGuid?: string; saveToRedis?: boolean };
