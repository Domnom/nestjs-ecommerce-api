import {
    IValidatorError,
    ValidatorError
} from './validator.error';


export class IValidationError
{
    message : string;
    errors : {
        [key: string] : IValidatorError
    }
}


/**
 * ValidationError will group many ValidatorErrors and provide a way to pretty print validation errors
 *
 * @export
 * @class ValidationError
 */
export class ValidationError
{
    message: string;
    validators: ValidatorError[];

    /**
     * Creates an instance of ValidationError.
     * 
     * @param {string} [message="Validation failed"]
     * @memberof ValidationError
     */
    constructor(message: string = "Validation failed")
    {
        this.message = message;
        this.validators = [];
    }


    /**
     * Add a validtor that will be pretty printed when the validation is converted to json
     *
     * @param {ValidatorError} validator
     * @memberof ValidationError
     */
    addValidator(validator: ValidatorError)
    {
        this.validators.push(validator);
    }


    /**
     * Check if there are validators for this validation error
     *
     * @returns {boolean}
     * @memberof ValidationError
     */
    hasValidators(): boolean
    {
        return this.validators.length > 0;
    }


    /**
     * Return the json formatted constraint
     *
     * @returns {IValidationError}
     * @memberof ValidationError
     */
    toJson(): IValidationError
    {
        let errors = {};

        this.validators.forEach((validator: ValidatorError) => {
            errors[validator.property] = validator.toJson();
        })

        return {
            message: this.message,
            errors : errors
        }
    }

}