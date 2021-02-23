import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swaggerApiOptions } from 'common/swagger';

export type AppSwaggerOptions = {
    host?: string;
    port?: number;
    apiPrefix?: string;
};

export class AppSwagger {
    public static configure(app: NestExpressApplication, options: AppSwaggerOptions = {}): void {
        const { host, port, apiPrefix } = options;
        const url = `http://${host}${port ? `:${port}` : ''}`;
        const config = new DocumentBuilder()
            .setTitle('Nest API')
            .setDescription('Documentation')
            .setVersion('1.0')
            .addServer(url)
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .build();
        const document = SwaggerModule.createDocument(app, config, swaggerApiOptions);
        SwaggerModule.setup(`${apiPrefix}${apiPrefix ? '/' : ''}swagger`, app, document);
    }
}
