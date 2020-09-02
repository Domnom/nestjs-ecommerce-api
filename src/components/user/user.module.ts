import { Module } from '@nestjs/common';

/**
 * @import Modules
 */
import { DatabaseModule } from '../../common/modules/database.module';

/**
 * @import Controllers
 */
import { UserController } from './controller';

/**
 * @import Services
 */
import { UserService } from './services';

/**
 * @import Providers
 */
import { userProviders } from './providers';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        ...userProviders
    ],
    exports : [
        UserService
    ]
})
export class UserModule {}
