import {
    ApiProperty
} from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({
        description: "The name of the user",
        example: "Jane Doe",
        required: false
    })
    name?: string;

    @ApiProperty({
        description: "The delivery street address",
        example: "123 Doe Street",
        required: false
    })
    street?: string;

    @ApiProperty({
        description: "The city of the delivery address",
        example: "Sample city",
        required: false
    })
    city?: string;

    @ApiProperty({
        description: "The country of the delivery address",
        example: "Sample country",
        required: false
    })
    country?: string;

}