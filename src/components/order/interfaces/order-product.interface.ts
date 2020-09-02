import { 
    Types
} from 'mongoose';

/**
 * @import Interfaces
 */
import { IProductMongoose } from '../../product/interfaces';

export interface IOrderProduct {
    _id: Types.ObjectId;
    product_id?: Types.ObjectId | IProductMongoose;
    product?: IProductMongoose;
    name?: string;
    price?: number;
    quantity?: number;
}