import { Module } from '@nestjs/common';

/**
 * @import Modules
 */
import { DatabaseModule } from '../../common/modules/database.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

/**
 * @import Controllers
 */
import { 
    OrderController,
    OrderProductController
} from './controller';

/**
 * @import Services
 */
import { 
    OrderService,
    OrderProductService,
    OrderValidationService,
    OrderProductValidationService,
} from './services';

/**
 * @import Providers
 */
import { orderProviders } from './providers';

@Module({
    imports: [
        DatabaseModule,
        ProductModule,
        UserModule
    ],
    controllers: [
        OrderController,
        OrderProductController
    ],
    providers: [
        OrderService,
        OrderProductService,
        OrderValidationService,
        OrderProductValidationService,
        ...orderProviders
    ],
})
export class OrderModule {}
