/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

export class CreateOrderProductDto {

    @ApiProperty({
        description : "The product that has been added to the order",
        example : "5ec72fd3cc15ca01220b3a8f",
        required : true
    })
    product_id : string;
    
    @ApiProperty({
        description : "The number of products ordered",
        example : 6,
        required : true
    })
    quantity: number;

}


