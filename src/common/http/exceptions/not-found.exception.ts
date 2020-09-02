import {
    NotFoundException as NestJsNotFoundException
} from '@nestjs/common'

import { ApiProperty } from '@nestjs/swagger'

export class NotFoundException extends NestJsNotFoundException
{
    @ApiProperty({
        description: "A message describing the error",
        default: "Not Found",
        example: "Not Found"
    })
    message : string;

    constructor(message?: string)
    {
        super({
            message : message ? message : "Not Found"
        })
    }
}