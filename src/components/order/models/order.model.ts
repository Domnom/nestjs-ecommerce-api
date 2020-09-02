/**
 * @import Libraries
 */
import {
    Types
} from 'mongoose'
import {
    ApiProperty
} from '@nestjs/swagger';

/**
 * @import Interfaces
 */
import { IOrderMongoose, IOrderProduct } from '../interfaces';

/**
 * @import Models
 */
import { User } from '../../user/models';
import { OrderDeliveryDetail } from './order-delivery_detail.model';
import { OrderProduct } from './order-product.model';
import { IUserMongoose } from 'src/components/user/interfaces';


export class Order {

    @ApiProperty({
        description: "A unique ID",
        example: "5ec72fd3cc15ca01220b3a8f",
        required: true
    })
    _id: string;

    @ApiProperty({
        description : "The user that has created this order",
        example : "5ec72fd3cc15ca01220b3a8f",
        required : true
    })
    user_id : string | User;

    @ApiProperty({
        description : "The delivery details for this order",
        type : OrderDeliveryDetail
    })
    delivery_details : OrderDeliveryDetail;

    @ApiProperty({
        description : "The products that are in this order"
    })
    products : OrderProduct[];

    constructor(order: IOrderMongoose)
    {
        this._id = order._id.toHexString();
        if (order.user_id instanceof Types.ObjectId)
        {
            this.user_id = (order.user_id as Types.ObjectId).toHexString();
        }
        else if (typeof order.user_id == "string")
        {
            this.user_id = order.user_id;
        }
        else
        {
            this.user_id = new User(order.user_id as IUserMongoose);
        }
        this.delivery_details = new OrderDeliveryDetail(order.delivery_details);
        this.products = order.products.map((orderProduct: IOrderProduct) => {
            return new OrderProduct(orderProduct);
        })
    }

}