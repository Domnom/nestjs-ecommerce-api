import {
    ApiProperty
} from '@nestjs/swagger';

export class UpdateOrderDto {

    @ApiProperty({
        description: "The name of the order",
        example: "Donut",
        required: false
    })
    name?: string;

    @ApiProperty({
        description: "A description of the order",
        required: false
    })
    description?: string;

    @ApiProperty({
        description: "The price of the order",
        example: "4.50",
        required: false
    })
    price?: number;

}