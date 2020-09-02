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
    CreateProductDto,
    UpdateProductDto
} from '../dtos';

/**
 * @import Models
 */
import {
    Product
} from '../models';

/**
 * @import Services
 */
import { ProductService } from '../services';

/**
 * @import Interfaces
 */
import { IProductMongoose } from '../interfaces';


@Controller('product')
export class ProductController {
    
    constructor(
        private readonly productService: ProductService
    )
    {}

    @Get()
    @ApiOperation({
        summary : "Get a list of products"
    })
    @ApiOkResponse({
        type : Product,
        isArray : true
    })
    @ApiAllErrorResponses()
    async findAll(): Promise<Product[]>
    {
        try
        {
            let productData: IProductMongoose[] = await this.productService.findAll();

            return productData.map((product: IProductMongoose) => {
                return new Product(product);
            })
        }
        catch(err)
        {
            throw err;
        }
    }

    @Get(':id')
    @ApiOperation({
        summary: "Get a single product"
    })
    @ApiOkResponse({
        type : Product
    })
    @ApiParam({
        name : "id",
        description : "The product id"
    })
    @ApiAllErrorResponses()
    async findById(
        @Param('id') id: string
    ): Promise<Product>
    {
        try
        {
            let productData: IProductMongoose = await this.productService.findById(id);

            return new Product(productData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Post()
    @ApiOperation({
        summary : "Create a new product"
    })
    @ApiBody({
        type : CreateProductDto
    })
    @ApiOkResponse({
        type : Product
    })
    @ApiAllErrorResponses()
    async create(
        @Body() createProductDto: CreateProductDto
    ): Promise<Product>
    {
        try
        {
            let productData: IProductMongoose = await this.productService.create(createProductDto);
            
            return new Product(productData);
        }
        catch(err)
        {
            throw err;
        }
    }



    @Put(':id')
    @ApiOperation({
        summary : "Update the details of an existing product"
    })
    @ApiParam({
        name : "id",
        description : "The id of the product that will be updated"
    })
    @ApiBody({
        type : UpdateProductDto
    })
    @ApiOkResponse({
        type : Product
    })
    @ApiAllErrorResponses()
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product>
    {
        try
        {
            let productData: IProductMongoose = await this.productService.update(id, updateProductDto);

            return new Product(productData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Delete(':id')
    @ApiOperation({
        summary : "Deletes a single product"
    })
    @ApiParam({
        name : "id",
        description : "The id of the product that will be updated"
    })
    @ApiOkResponse({
        type : Product
    })
    @ApiAllErrorResponses()
    async delete(
        @Param('id') id: string
    ): Promise<Product>
    {
        try
        {
            let productData: IProductMongoose = await this.productService.delete(id);

            return new Product(productData);
        }
        catch(err)
        {
            throw err;
        }
    }
}