/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

/**
 * @import Interfaces
 */
import { IOrderDeliveryDetail } from '../interfaces';



export class OrderDeliveryDetail {

    @ApiProperty({
        description: "A unique ID",
        example: "5ec72fd3cc15ca01220b3a8f",
        required: true
    })
    _id: string;

    @ApiProperty({
        description : "The name of the user",
        example : "Jane Doe",
        required : true
    })
    name : string;

    @ApiProperty({
        description : "The street to deliver to",
        example : "123 Simple street",
        required : true
    })
    street : string;

    @ApiProperty({
        description : "The city to deliver to",
        example : "Simple City",
        required : true
    })
    city : string;

    @ApiProperty({
        description : "The country to deliver to",
        example : "Simple Country",
        required : true
    })
    country : string;

    constructor(orderDeliveryDetail: IOrderDeliveryDetail)
    {
        this.name = orderDeliveryDetail.name;
        this.street = orderDeliveryDetail.street;
        this.city = orderDeliveryDetail.city;
        this.country = orderDeliveryDetail.country;
    }

}