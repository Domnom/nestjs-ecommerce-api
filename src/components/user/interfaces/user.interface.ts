import { 
    Types,
    Document
} from 'mongoose';

export interface IUserMongoose extends Document {
    _id: Types.ObjectId;
    name: string;
    street: string;
    city: string;
    country: string;
}