import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



export class SwaggerUtil {

    static buildSwagger(app) {

        const options = new DocumentBuilder()
            .setTitle('e-commerce api')
            .setDescription('The e-commerce api to learn about mongo')
            .setVersion('0.0.1')
            .setBasePath('/')
            .build();

        const swaggerDoc = SwaggerModule.createDocument(
            app,
            options,
            // SwaggerUtil.includeModules()
        );
        SwaggerModule.setup('docs', app, swaggerDoc);

    }
}