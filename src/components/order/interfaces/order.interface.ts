import { 
    Types,
    Document
} from 'mongoose';

/**
 * @import Interfaces
 */
import { IUserMongoose } from '../../user/interfaces';
import { IOrderDeliveryDetail } from './order-delivery_detail.interface';
import { IOrderProduct } from './order-product.interface';

export interface IOrderMongoose extends Document {
    _id: Types.ObjectId;
    user_id : Types.ObjectId | IUserMongoose;
    delivery_details: IOrderDeliveryDetail;
    products: IOrderProduct[];
}