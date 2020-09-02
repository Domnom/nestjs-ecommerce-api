import { Module } from '@nestjs/common';

/**
 * @import Modules
 */
import { DatabaseModule } from '../../common/modules/database.module';

/**
 * @import Controllers
 */
import { ProductController } from './controller';

/**
 * @import Services
 */
import { ProductService } from './services';

/**
 * @import Providers
 */
import { productProviders } from './providers';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        ProductController
    ],
    providers: [
        ProductService,
        ...productProviders
    ],
    exports : [
        ProductService
    ]
})
export class ProductModule {}
