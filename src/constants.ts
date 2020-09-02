import * as assert from 'assert'; 
import * as dotenv from 'dotenv';

// -- Load env
dotenv.config();

/**
 * @Generic
 */
export const PORT = process.env.PORT;


/**
 * @Library MongoDB
 */
export const DB_CONNECTION_TOKEN = "DATABASE_MONGO_CONNECTION";
export const DB_URI = process.env.MONGODB;
export const DB_TABLE_MODELS = {
    user : "USER_MODEL",
    order : "ORDER_MODEL",
    product : "PRODUCT_MODEL",
}
