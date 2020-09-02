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
    IProductMongoose, 
} from '../interfaces';

/**
 * @import Dtos
 */
import {
    CreateProductDto, 
    UpdateProductDto
} from '../dtos';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/not-found.exception'

@Injectable()
export class ProductService {

    constructor(
       @Inject(DB_TABLE_MODELS.product) private productModel: Model<IProductMongoose> 
    ){}


    async findAll(): Promise<IProductMongoose[]>
    {
        try
        {
            let productsData: IProductMongoose[] = await this.productModel.find();

            return productsData;
        }
        catch(err)
        {
            throw err;
        }
    }

    /**
     * Searches for a product by ID. Throws a 404 exception if not found
     *
     * @param {string} id
     * @returns {Promise<IProductMongoose>}
     * @memberof ProductService
     */
    async findById(id: string): Promise<IProductMongoose>
    {
        try
        {
            let productData: IProductMongoose = await this.productModel.findById(id);

            if (!productData)
            {
                throw new NotFoundException();
            }
            return productData;
        }
        catch(err)
        {
            throw err;
        }
    }
    

    /**
     * Create a new product
     *
     * @param {CreateProductDto} createProductDto
     * @returns {Promise<IProductMongoose>}
     * @memberof ProductService
     */
    async create(createProductDto: CreateProductDto): Promise<IProductMongoose>
    {
        try
        {
            const createdProduct: IProductMongoose = new this.productModel(createProductDto);
            const productData: IProductMongoose = await createdProduct.save();

            return productData;
        }
        catch(err)
        {
            throw err;
        }
    }


    /**
     * Finds and updates an existing product
     *
     * @param {string} id
     * @param {UpdateProductDto} updateProductDto
     * @returns {Promise<IProductMongoose>}
     * @memberof ProductService
     */
    async update(id: string, updateProductDto: UpdateProductDto): Promise<IProductMongoose>
    {
        try
        {
            /*
             * findByIdAndUpdate searches for a model. If it exists then the update is immediately executed.
             *
             * If we were to manually use find + save() then there is a chance that we override data that may be updating in parallel
             */
            const productData: IProductMongoose = await this.productModel.findByIdAndUpdate(
                {
                    _id : id
                },
                updateProductDto,
                {
                    new : true
                }
            );

            if (!productData)
            {
                throw new NotFoundException();
            }
            return productData;
        }
        catch(err)
        {
            throw err;
        }
    }



    /**
     * Finds and deletes a product
     *
     * @param {string} id
     * @returns {Promise<IProductMongoose>}
     * @memberof ProductService
     */
    async delete(id: string): Promise<IProductMongoose>
    {
        try
        {
            const productData: IProductMongoose = await this.productModel.findByIdAndDelete(
                {
                    _id : id
                }
            )

            if (!productData)
            {
                throw new NotFoundException();
            }
            return productData;
        }
        catch(err)
        {
            throw err;
        }
    }

}