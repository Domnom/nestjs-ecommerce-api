import {
    Types
} from 'mongoose';
import {
    Injectable
} from '@nestjs/common'

/**
 * @import Interface
 */
import { IOrderProduct } from '../interfaces';

/**
 * @import Dtos
 */
import { CreateOrderProductDto, UpdateOrderProductDto } from '../dtos';

/**
 * @import Errors
 */
import {
    ValidationError,
    ValidatorError,
    InvalidRelationshipConstraintError,
    RequiredValidatorConstraintError,
    MinValidatorConstraintError
} from '../../../common/errors/validation';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/index';

/**
 * @import Services
 */
import { ProductService } from '../../product/services';
import { IProductMongoose } from 'src/components/product/interfaces';

@Injectable()
export class OrderProductValidationService
{
    constructor(
        private readonly productService: ProductService
    ){}



    /**
     * Takes a dto from a post request and converts it to a truster order product. This is helpful as we can generate a mongo id which can be
     * used in the service to fetch the newly created order product
     *
     * @param {CreateOrderProductDto} createOrderProductDto
     * @returns {Promise<IOrderProduct>}
     * @memberof OrderProductValidationService
     */
    async validateAndTransformCreateDto (createOrderProductDto: CreateOrderProductDto): Promise<IOrderProduct>
    {
        try
        {
            let safeOrderProduct: IOrderProduct = {
                _id : Types.ObjectId()
            }

            // -- Create the validation error object. This is instantiated early so we can add validator errors as we go. 
            //    Before we return, check if this validation error has any validator errors. If there are errors then we want to throw the validation error
            let validationError: ValidationError = new ValidationError();

            if (createOrderProductDto.hasOwnProperty("quantity"))
            {
                if (createOrderProductDto.quantity > 0)
                {
                    safeOrderProduct.quantity = createOrderProductDto.quantity;
                }
                else
                {
                    let validatorError: ValidatorError = new ValidatorError('quantity');
                        validatorError.addConstraint(new MinValidatorConstraintError(1));

                    validationError.addValidator(validatorError);
                }
            }
            else
            {
                let validatorError: ValidatorError = new ValidatorError('quantity');
                    validatorError.addConstraint(new RequiredValidatorConstraintError());

                validationError.addValidator(validatorError);
            }

            if (createOrderProductDto.product_id)
            {
                try
                {
                    // -- Fetch this product ID
                    let product: IProductMongoose = await this.productService.findById(createOrderProductDto.product_id);

                    safeOrderProduct = {
                        ...safeOrderProduct,
                        product_id : product._id,
                        name : product.name,
                        price : product.price
                    }
                }
                catch(err)
                {
                    if (err instanceof NotFoundException)
                    {
                        let validatorError: ValidatorError = new ValidatorError('product_id', undefined, createOrderProductDto.product_id);
                            validatorError.addConstraint(new InvalidRelationshipConstraintError("The given product_id does not exist"));
                        validationError.addValidator(validatorError);
                    }
                    else
                    {
                        throw err;
                    }
                }
            }
            else
            {
                // -- The product id is required!
                let validatorError: ValidatorError = new ValidatorError('product_id');
                    validatorError.addConstraint(new RequiredValidatorConstraintError());

                validationError.addValidator(validatorError);
            }


            // -- Check if there are any validator errors. If there are, then throw the validation error
            if (validationError.hasValidators())
            {
                throw validationError;
            }

            return safeOrderProduct;

        }
        catch(err)
        {
            throw err;
        }
    }



    async validateAndTransformUpdateDto(updateOrderProductDto: UpdateOrderProductDto): Promise<UpdateOrderProductDto>
    {
        try
        {
            let safeOrderProductUpdateDto : UpdateOrderProductDto = {}

            let validationError: ValidationError = new ValidationError();

            if (updateOrderProductDto.hasOwnProperty('quantity'))
            {
                if (updateOrderProductDto.quantity > 0)
                {
                    safeOrderProductUpdateDto.quantity = updateOrderProductDto.quantity;
                }
                else
                {
                    let validatorError: ValidatorError = new ValidatorError('quantity');
                        validatorError.addConstraint(new MinValidatorConstraintError(1));

                    validationError.addValidator(validatorError);
                }
            }
            
            if (validationError.hasValidators())
            {
                throw validationError;
            }

            return safeOrderProductUpdateDto;
        }
        catch(err)
        {
            throw err;
        }
    }
}