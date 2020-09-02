/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({
        description: "The name of the product",
        example: "Donut",
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

}