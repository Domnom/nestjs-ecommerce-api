import { Model, Types } from 'mongoose';
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
    IOrderMongoose,
    IOrderProduct
} from '../interfaces';

/**
 * @import Dtos
 */
import {
    CreateOrderProductDto,
    UpdateOrderProductDto
} from '../dtos';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/not-found.exception'

/**
 * @import Services
 */
import { OrderProductValidationService } from './order-product.validation.service';

@Injectable()
export class OrderProductService {

    constructor(
        private readonly orderProductValidationService: OrderProductValidationService,
       @Inject(DB_TABLE_MODELS.order) private orderModel: Model<IOrderMongoose> 
    ){}

    /**
     * Searches for a order product by ID
     *
     * @param {string} id
     * @returns {Promise<IOrderProduct>}
     * @memberof OrderService
     */
    async findById(orderId: string, productId: string): Promise<IOrderProduct>
    {
        try
        {
            let orderProductData: IOrderProduct[] = await this.orderModel.aggregate(
                [
                    {
                        $match : {
                            _id : Types.ObjectId(orderId)
                        }
                    },
                    {
                        // -- Filter the products to find a product
                        $addFields : {
                            "product" : {
                                $filter : {
                                    input : "$products",
                                    as : "product",
                                    cond : {
                                        $eq : ['$$product._id', Types.ObjectId(productId)]
                                    }
                                }
                            }
                        }
                    },
                    {
                        // -- unwind the product array that was created in the $addFields command to remove the array nesting (unwind moves it from this.product[] to this.product)
                        $unwind : "$product"
                    }
                ]
            );

            if (orderProductData.length === 0 || !orderProductData[0].product)
            {
                throw new NotFoundException();
            }
            return orderProductData[0].product;
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
    async create(orderId: string, createOrderProductDto: CreateOrderProductDto): Promise<IOrderProduct>
    {
        try
        {
            const orderProduct: IOrderProduct = await this.orderProductValidationService.validateAndTransformCreateDto(createOrderProductDto);

            const result: IOrderMongoose = await this.orderModel.findOneAndUpdate(
                {
                    _id : orderId
                },
                {
                    $addToSet : {
                        'products' : orderProduct
                    }
                },
                {
                    new: true,
                    projection : {
                        'products' : {
                            $elemMatch : {
                                _id : orderProduct._id
                            }
                        }
                    }
                }
            )

            if (result && result.products && result.products[0])
            {
                return result.products[0];
            }
            else
            {
                throw new NotFoundException();
            }

        }
        catch(err)
        {
            throw err;
        }
    }


    /**
     * Finds and updates an existing order
     *
     * @param {string} id
     * @param {UpdateOrderDto} updateOrderDto
     * @returns {Promise<IOrderMongoose>}
     * @memberof OrderService
     */
    async update(orderId: string, productId: string, updateOrderProductDto: UpdateOrderProductDto): Promise<IOrderProduct>
    {
        try
        {
            const safeUpdateOrderProductDto = await this.orderProductValidationService.validateAndTransformUpdateDto(updateOrderProductDto);

            // -- We will need to create the update object now as update properties are optional.
            let setData = {}
            if (safeUpdateOrderProductDto.hasOwnProperty('quantity'))
            {
                setData['products.$.quantity'] = safeUpdateOrderProductDto.quantity;
            }

            const orderData: IOrderMongoose = await this.orderModel.findOneAndUpdate(
                {
                    '_id' : orderId,
                    'products._id' : productId
                },
                {
                    $set : setData
                },
                {
                    new : true,
                    projection : {
                        'products' : {
                            $elemMatch : {
                                '_id' : productId
                            }
                        }
                    }
                }
            );

            if (orderData && orderData.products && orderData.products.length != 0)
            {
                return orderData.products[0];
            }
            else
            {
                throw new NotFoundException();
            }
        }
        catch(err)
        {
            throw err;
        }
    }



    /**
     * Finds and removes a product from an order
     *
     * @param {string} id
     * @returns {Promise<IOrderMongoose>}
     * @memberof OrderProductService
     */
    async delete(orderId: string, productId: string): Promise<IOrderMongoose>
    {
        try
        {
            const orderData: IOrderMongoose = await this.orderModel.findOneAndUpdate(
                {
                    _id : orderId
                },
                {
                    $pull : {
                        'products' : {
                            "_id" : Types.ObjectId(productId)
                        }
                    }
                },
                {
                    new : true
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