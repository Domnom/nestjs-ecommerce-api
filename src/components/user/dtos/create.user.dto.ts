/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: "The name of the user",
        example: "Jane Doe",
        required: true
    })
    name: string;

    @ApiProperty({
        description: "The delivery street address",
        example: "123 Doe Street",
        required: true
    })
    street: string;

    @ApiProperty({
        description: "The city of the delivery address",
        example: "Sample city",
        required: true
    })
    city: string;

    @ApiProperty({
        description: "The country of the delivery address",
        example: "Sample country",
        required: true
    })
    country: string;

}