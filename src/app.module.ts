import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';


/**
 * @import Modules
 */
import { UserModule } from './components/user/user.module';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';

/**
 * @import Interceptors
 */
import { ErrorHandlingInterceptor } from './common/interceptors/error-handling.interceptor';

@Module({
    imports: [
        UserModule,
        ProductModule,
        OrderModule
    ],
    controllers: [],
    providers: [
        {
			provide : APP_INTERCEPTOR,
			useClass : ErrorHandlingInterceptor
		}
    ],
})
export class AppModule {}
