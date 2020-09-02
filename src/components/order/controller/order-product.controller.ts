import {
    Controller, 
    Get,
    Post,
    Body,
    Param,
    Query,
    Delete,
    Put,
    BadRequestException
} from '@nestjs/common';

import {
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiOkResponse,
    
    ApiParam
} from '@nestjs/swagger';

/**
 * @import Decorators
 */
import {
    ApiAllErrorResponses
} from '../../../common/decorators/error-response.decorator'

/**
 * @import Dtos
 */
import {
    CreateOrderProductDto, UpdateOrderProductDto
} from '../dtos';

/**
 * @import Models
 */
import {
    Order,
    OrderProduct
} from '../models';

/**
 * @import Services
 */
import { OrderProductService } from '../services';

/**
 * @import Interfaces
 */
import { 
    IOrderMongoose, 
    IOrderProduct 
} from '../interfaces';


@Controller('order/:orderId/product')
export class OrderProductController {
    
    constructor(
        private readonly orderProductService: OrderProductService
    )
    {}

    @Get(':productId')
    @ApiOperation({
        summary: "Get a single product in an order"
    })
    @ApiOkResponse({
        type : OrderProduct
    })
    @ApiParam({
        name : "orderId",
        description : "The order id"
    })
    @ApiParam({
        name : "productId",
        description : "The product id"
    })
    @ApiAllErrorResponses()
    async findById(
        @Param('orderId') orderId: string,
        @Param('productId') productId: string
    ): Promise<OrderProduct>
    {
        try
        {
            const orderProductData: IOrderProduct = await this.orderProductService.findById(orderId, productId);

            return new OrderProduct(orderProductData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Post()
    @ApiOperation({
        summary : "Add a new product to the order"
    })
    @ApiParam({
        name : "orderId",
        description : "The order that we will be adding the product to"
    })
    @ApiBody({
        type : CreateOrderProductDto
    })
    @ApiOkResponse({
        type : OrderProduct
    })
    @ApiAllErrorResponses()
    async create(
        @Param('orderId') orderId: string, 
        @Body() createOrderProductDto: CreateOrderProductDto
    ): Promise<OrderProduct>
    {
        try
        {
            let orderProductData: IOrderProduct = await this.orderProductService.create(orderId, createOrderProductDto);
            
            return new OrderProduct(orderProductData);
        }
        catch(err)
        {
            throw err;
        }
    }



    @Put(':productId')
    @ApiOperation({
        summary : "Update the details of an existing order"
    })
    @ApiParam({
        name : "id",
        description : "The id of the order that will be updated"
    })
    @ApiBody({
        type : UpdateOrderProductDto
    })
    @ApiOkResponse({
        type : OrderProduct
    })
    @ApiAllErrorResponses()
    async update(
        @Param('orderId') orderId: string,
        @Param('productId') productId: string,
        @Body() updateOrderDto: UpdateOrderProductDto
    ): Promise<OrderProduct>
    {
        try
        {
            let orderProductData: IOrderProduct = await this.orderProductService.update(orderId, productId, updateOrderDto);

            return new OrderProduct(orderProductData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Delete(':productId')
    @ApiOperation({
        summary : "Removes a product from an order"
    })
    @ApiParam({
        name : "orderId",
        description : "The id of the order that will be updated"
    })
    @ApiParam({
        name : "productId",
        description : "The id of the product that will be removed"
    })
    @ApiOkResponse({
        type : Order
    })
    @ApiAllErrorResponses()
    async delete(
        @Param('orderId') orderId: string,
        @Param('productId') productId: string
    ): Promise<Order>
    {
        try
        {
            let orderData: IOrderMongoose = await this.orderProductService.delete(orderId, productId);

            return new Order(orderData);
        }
        catch(err)
        {
            throw err;
        }
    }
}