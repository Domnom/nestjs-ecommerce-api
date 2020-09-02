/**
 * @import Libraries
 */
import {
    Document
} from 'mongoose'
import {
    ApiProperty
} from '@nestjs/swagger';

/**
 * @import Interfaces
 */
import { IProductMongoose } from '../interfaces';


export class Product {

    @ApiProperty({
        description: "A unique ID",
        example: "5ec72fd3cc15ca01220b3a8f",
        required: true
    })
    _id: string;

    @ApiProperty({
        description: "The name of the product",
        example: "Jane Doe",
        required: true
    })
    name: string;

    @ApiProperty({
        description: "A description of the product",
        required: false
    })
    description?: string;

    @ApiProperty({
        description: "The price of the product",
        example: "4.50",
        required: true
    })
    price: number;

    constructor(product: IProductMongoose)
    {
        this._id = product._id.toHexString();
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
    }

}