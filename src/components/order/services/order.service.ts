import { Model } from 'mongoose';
import {
    Injectable,
    Inject
} from '@nestjs/common';

/**
 * @import Constants
 */
import {
    DB_TABLE_MODELS
} from '../../../constants';


/**
 * @import Interfaces
 */
import { 
    IOrderMongoose
} from '../interfaces';

/**
 * @import Dtos
 */
import {
    CreateOrderDto
} from '../dtos';

/**
 * @import Services
 */
import { OrderValidationService } from './order.validation.service';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/not-found.exception'

@Injectable()
export class OrderService {

    constructor(
        private readonly orderValidationService: OrderValidationService,
        @Inject(DB_TABLE_MODELS.order) private orderModel: Model<IOrderMongoose> 
    ){}

    async findAll(): Promise<IOrderMongoose[]>
    {
        try
        {
            const ordersData: IOrderMongoose[] = await this.orderModel.find();

            return ordersData;
        }
        catch(err)
        {
            throw err;
        }
    }

    /**
     * Searches for a order by ID. Throws a 404 exception if not found
     *
     * @param {string} id
     * @returns {Promise<IOrderMongoose>}
     * @memberof OrderService
     */
    async findById(id: string): Promise<IOrderMongoose>
    {
        try
        {
            let orderData: IOrderMongoose = await this.orderModel.findById(id);

            if (!orderData)
            {
                throw new NotFoundException();
            }
            return orderData;
        }
        catch(err)
        {
            throw err;
        }
    }
    

    /**
     * Create a new order
     *
     * @param {CreateOrderDto} createOrderDto
     * @returns {Promise<IOrderMongoose>}
     * @memberof OrderService
     */
    async create(createOrderDto: CreateOrderDto): Promise<IOrderMongoose>
    {
        try
        {
            const safeCreateOrderDto: CreateOrderDto = await this.orderValidationService.validateAndTransformCreateDto(createOrderDto);

            const createdOrder: IOrderMongoose = new this.orderModel(safeCreateOrderDto);
            const orderData: IOrderMongoose = await createdOrder.save();

            return orderData;
        }
        catch(err)
        {
            throw err;
        }
    }


    /**
     * Finds and deletes a order
     *
     * @param {string} id
     * @returns {Promise<IOrderMongoose>}
     * @memberof OrderService
     */
    async delete(id: string): Promise<IOrderMongoose>
    {
        try
        {
            const orderData: IOrderMongoose = await this.orderModel.findByIdAndDelete(
                {
                    _id : id
                }
            )

            if (!orderData)
            {
                throw new NotFoundException();
            }
            return orderData;
        }
        catch(err)
        {
            throw err;
        }
    }

}