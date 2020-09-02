import {
    Injectable
} from '@nestjs/common';

/**
 * @import Interface
 */
import { IUserMongoose } from '../../user/interfaces';

/**
 * @import Dtos
 */
import { CreateOrderDto } from '../dtos';

/**
 * @import Errors
 */
import {
    ValidationError,
    ValidatorError,
    InvalidRelationshipConstraintError,
    RequiredValidatorConstraintError
} from '../../../common/errors/validation';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/index';

/**
 * @import Services
 */
import { UserService } from '../../user/services';



@Injectable()
export class OrderValidationService
{
    constructor(
        private readonly userService: UserService
    ){}

    async validateAndTransformCreateDto (createOrderDto: CreateOrderDto): Promise<CreateOrderDto>
    {
        try
        {
            let safeCreateOrderDto: CreateOrderDto = {
                user_id : createOrderDto.user_id
            }

            // -- Create the validation error object. This is instantiated early so we can add validator errors as we go. 
            //    Before we return, check if this validation error has any validator errors. If there are errors then we want to throw the validation error
            let validationError: ValidationError = new ValidationError();

            if (createOrderDto.user_id)
            {
                // -- Fetch this user ID
                try
                {
                    let user: IUserMongoose = await this.userService.findById(createOrderDto.user_id);
                    
                    safeCreateOrderDto.delivery_details = {
                        name : user.name,
                        street : user.street,
                        city : user.city,
                        country : user.country
                    }
                }
                catch(err)
                {
                    if (err instanceof NotFoundException)
                    {
                        let validatorError: ValidatorError = new ValidatorError('user_id', undefined, createOrderDto.user_id);
                            validatorError.addConstraint(new InvalidRelationshipConstraintError("The given user_id does not exist"));
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

            return safeCreateOrderDto;
        }
        catch(err)
        {
            throw err;
        }
    }
}