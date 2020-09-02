import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @import Constants
 */
import {
    PORT
} from './constants';

/**
 * @import Utils
 */
import { SwaggerUtil } from './common/utils/swagger.util';

async function bootstrap() {

    /*************
     * Resource server
     *************/
    const app = await NestFactory.create(AppModule);

    // -- Add swagger docs to resource server
    SwaggerUtil.buildSwagger(app);

    await app.listen(PORT);
}
bootstrap();
