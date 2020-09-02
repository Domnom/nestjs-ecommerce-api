import {
    MongoError
} from 'mongodb';

export class ExtendedMongoError extends MongoError
{
    driver: boolean;
    name: string;
    index: number;
    code: number;
    keyPattern?: {
        [key: string]: number
    };
    keyValue?: {
        [key: string]: string
    };
    errmsg: string;
    
    constructor(props : any)
    {
        super(props);
    }
}