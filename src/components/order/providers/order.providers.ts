import { Connection } from 'mongoose';

/**
 * @import Schemas
 */
import { OrderSchema } from '../schemas';

/**
 * @import Constants
 */
import {
    DB_CONNECTION_TOKEN,
    DB_TABLE_MODELS
} from '../../../constants';

export const orderProviders = [
    {
        provide: DB_TABLE_MODELS.order,
        useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
        inject: [DB_CONNECTION_TOKEN]
    }
]