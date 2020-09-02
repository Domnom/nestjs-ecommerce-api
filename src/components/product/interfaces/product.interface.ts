import { 
    Types,
    Document
} from 'mongoose';

export interface IProductMongoose extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
}