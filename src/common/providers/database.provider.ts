import * as mongoose from 'mongoose';

/**
 * @import Constants
 */
import {
    DB_CONNECTION_TOKEN
} from '../../constants';

export const databaseProviders = [
    {
        provide: DB_CONNECTION_TOKEN,
        useFactory: (options: any): Promise<typeof mongoose> => {
            return mongoose.connect(options.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
        },
        inject: ["DB_MONGO_OPTIONS"]
    }
];