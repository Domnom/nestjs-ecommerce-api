import { Connection } from 'mongoose';

/**
 * @import Schemas
 */
import { UserSchema } from '../schemas';

/**
 * @import Constants
 */
import {
    DB_CONNECTION_TOKEN,
    DB_TABLE_MODELS
} from '../../../constants';

export const userProviders = [
    {
        provide: DB_TABLE_MODELS.user,
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: [DB_CONNECTION_TOKEN]
    }
]