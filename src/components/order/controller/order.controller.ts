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
    CreateOrderDto,
    UpdateOrderDto
} from '../dtos';

/**
 * @import Models
 */
import {
    Order
} from '../models';

/**
 * @import Services
 */
import { OrderService } from '../services';

/**
 * @import Interfaces
 */
import { IOrderMongoose } from '../interfaces';


@Controller('order')
export class OrderController {
    
    constructor(
        private readonly orderService: OrderService
    )
    {}

    @Get()
    @ApiOperation({
        summary : "Get a list of orders"
    })
    @ApiOkResponse({
        type : Order,
        isArray : true
    })
    @ApiAllErrorResponses()
    async findAll(): Promise<Order[]>
    {
        try
        {
            const orders: IOrderMongoose[] = await this.orderService.findAll();

            return orders.map((order: IOrderMongoose) => new Order(order));
        }
        catch(err)
        {
            throw err;
        }
    }


    @Get(':id')
    @ApiOperation({
        summary: "Get a single order"
    })
    @ApiOkResponse({
        type : Order
    })
    @ApiParam({
        name : "id",
        description : "The order id"
    })
    @ApiAllErrorResponses()
    async findById(
        @Param('id') id: string
    ): Promise<Order>
    {
        try
        {
            let orderData: IOrderMongoose = await this.orderService.findById(id);

            return new Order(orderData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Post()
    @ApiOperation({
        summary : "Create a new order"
    })
    @ApiBody({
        type : CreateOrderDto
    })
    @ApiOkResponse({
        type : Order
    })
    @ApiAllErrorResponses()
    async create(
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order>
    {
        try
        {
            let orderData: IOrderMongoose = await this.orderService.create(createOrderDto);
            return new Order(orderData);
        }
        catch(err)
        {
            throw err;
        }
    }


    // -- Dont know what to update...
    // @Put(':id')
    // @ApiOperation({
    //     summary : "Update the details of an existing order"
    // })
    // @ApiParam({
    //     name : "id",
    //     description : "The id of the order that will be updated"
    // })
    // @ApiBody({
    //     type : UpdateOrderDto
    // })
    // @ApiOkResponse({
    //     type : Order
    // })
    // @ApiAllErrorResponses()
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateOrderDto: UpdateOrderDto
    // ): Promise<Order>
    // {
    //     try
    //     {
    //         let orderData: IOrderMongoose = await this.orderService.update(id, updateOrderDto);

    //         return new Order(orderData);
    //     }
    //     catch(err)
    //     {
    //         throw err;
    //     }
    // }


    @Delete(':id')
    @ApiOperation({
        summary : "Deletes a single order"
    })
    @ApiParam({
        name : "id",
        description : "The id of the order that will be updated"
    })
    @ApiOkResponse({
        type : Order
    })
    @ApiAllErrorResponses()
    async delete(
        @Param('id') id: string
    ): Promise<Order>
    {
        try
        {
            let orderData: IOrderMongoose = await this.orderService.delete(id);

            return new Order(orderData);
        }
        catch(err)
        {
            throw err;
        }
    }
}