/**
 * @import Libraries
 */
import {
    ApiProperty
} from '@nestjs/swagger';

export class UpdateOrderProductDto {
    
    @ApiProperty({
        description : "The number of products ordered",
        example : 6,
        required : true
    })
    quantity?: number;

}


