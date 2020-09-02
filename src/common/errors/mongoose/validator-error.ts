import {
    Error as MongooseError
} from 'mongoose'

export class MongooseValidatorError extends MongooseError.ValidatorError {
    
    properties: { 
        message: string; 
        type?: string; 
        path?: string; 
        value?: any; 
        reason?: any;
        enumValues?: string[];
        maxlength?: number;
        minlength?: number;
        max?: number;
        min?: number;
    };

    constructor(properties: {message?: string, type?: string, path?: string, value?: any, reason?: any, [key: string] : any})
    {
        super(properties)
    }
}