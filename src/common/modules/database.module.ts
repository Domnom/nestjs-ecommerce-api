import { Module } from '@nestjs/common';

/**
 * @import Constants
 */
import {
    DB_URI
} from '../../constants';

/**
 * @import Providers
 */
import { databaseProviders } from '../providers/database.provider';

@Module({
    providers: [
        ...databaseProviders,
        {
            provide: "DB_MONGO_OPTIONS",
            useValue: {
                "MONGO_URL": DB_URI
            }
        }
    ],
    exports: [
        ...databaseProviders
    ]
})
export class DatabaseModule { }