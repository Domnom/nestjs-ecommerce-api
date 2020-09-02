/**
 * @import Libraries
 */
import {
    Types
} from 'mongoose';
import {
    ApiProperty
} from '@nestjs/swagger';

/**
 * @import Interfaces
 */
import { IOrderProduct } from '../interfaces';

/**
 * @import Models
 */
import { Product } from '../../product/models';
import { IProductMongoose } from 'src/components/product/interfaces';


export class OrderProduct {

    @ApiProperty({
        description: "A unique ID",
        example: "5ec72fd3cc15ca01220b3a8f",
        required: true
    })
    _id: string;

    @ApiProperty({
        description : "The product that has been added to the order",
        example : "5ec72fd3cc15ca01220b3a8f",
        required : true
    })
    product_id : string | Product;

    @ApiProperty({
        description : "The name of the product. Kept here for historical reasons",
        example : "Donut",
        required : true
    })
    name : string;

    @ApiProperty({
        description: "The price of a single product",
        example: 4.50,
        required: true
    })
    price: number;

    @ApiProperty({
        description : "The number of products ordered",
        example : 6,
        required : true
    })
    quantity: number;

    constructor(orderProduct: IOrderProduct)
    {
        this._id = orderProduct._id.toHexString();
        if (orderProduct.product_id instanceof Types.ObjectId)
        {
            this.product_id = (orderProduct.product_id as Types.ObjectId).toHexString();
        }
        else if (typeof orderProduct.product_id == "string")
        {
            this.product_id = orderProduct.product_id;
        }
        else
        {
            this.product_id = new Product(orderProduct.product_id as IProductMongoose);
        }
        this.price = orderProduct.price;
        this.quantity = orderProduct.quantity;
    }

}