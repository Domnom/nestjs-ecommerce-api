/**
 * @import Libraries
 */
import {
    Document
} from 'mongoose'
import {
    ApiProperty
} from '@nestjs/swagger';

/**
 * @import Interfaces
 */
import { IUserMongoose } from '../interfaces';


export class User {

    @ApiProperty({
        description: "A unique ID",
        example: "5ec72fd3cc15ca01220b3a8f",
        required: true
    })
    _id: string;

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

    constructor(user: IUserMongoose)
    {
        this._id = user._id.toHexString();
        this.name = user.name;
        this.street = user.street;
        this.city = user.city;
        this.country = user.country;
    }

}