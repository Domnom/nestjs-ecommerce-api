/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

export class CreateOrderDeliveryDetailDto {

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

}