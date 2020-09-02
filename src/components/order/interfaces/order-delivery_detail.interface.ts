import { 
    Types
} from 'mongoose';

export interface IOrderDeliveryDetail {
    name: string;
    street: string;
    city: string;
    country: string;
}