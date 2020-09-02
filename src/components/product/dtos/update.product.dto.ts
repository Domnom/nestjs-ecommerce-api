import {
    ApiProperty
} from '@nestjs/swagger';

export class UpdateProductDto {

    @ApiProperty({
        description: "The name of the product",
        example: "Donut",
        required: false
    })
    name?: string;

    @ApiProperty({
        description: "A description of the product",
        required: false
    })
    description?: string;

    @ApiProperty({
        description: "The price of the product",
        example: "4.50",
        required: false
    })
    price?: number;

}