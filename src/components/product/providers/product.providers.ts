import { Connection } from 'mongoose';

/**
 * @import Schemas
 */
import { ProductSchema } from '../schemas';

/**
 * @import Constants
 */
import {
    DB_CONNECTION_TOKEN,
    DB_TABLE_MODELS
} from '../../../constants';

export const productProviders = [
    {
        provide: DB_TABLE_MODELS.product,
        useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
        inject: [DB_CONNECTION_TOKEN]
    }
]