import {
    ValidatorConstraintError,
    IValidatorConstraintError
} from './validator-constraint.error';


/**
 * ValidatorError interface
 *
 * @export
 * @interface IValidatorError
 */
export interface IValidatorError {
    message : string;
    data?: any;
    constraints : {
        [key: string] : IValidatorConstraintError
    }
}


/**
 * Validator error will describe the validation error and the constraints required by this property
 *
 * @export
 * @class ValidatorError
 */
export class ValidatorError
{
    property: string;
    message: string;
    data?: any;
    constraints: ValidatorConstraintError[];

    /**
     * Creates an instance of ValidatorError.

     * @param {*} property
     * @param {*} message
     * @memberof ValidatorError
     */
    constructor(property: string, message: string = "There was an issue with your data", data?: any)
    {
        this.property = property;
        this.message = message;
        this.data = data;
        this.constraints = [];
    }

    /**
     * Add a constraint that will be pretty printed when the validator is converted to json
     *
     * @param {ValidatorConstraintError} constraint
     * @memberof ValidatorError
     */
    addConstraint(constraint: ValidatorConstraintError)
    {
        this.constraints.push(constraint);
    }

    /**
     * Check if there are constraints for this validator
     *
     * @returns {boolean}
     * @memberof ValidatorError
     */
    hasConstraints(): boolean
    {
        return this.constraints.length > 0;
    }

    /**
     * Return the json formatted validator
     *
     * @returns {IValidatorError}
     * @memberof ValidatorError
     */
    toJson(): IValidatorError
    {
        let constraints = {};
        
        this.constraints.forEach((constraint: ValidatorConstraintError) => {
            constraints[constraint.type] = constraint.toJson();
        });

        return {
            message : this.message,
            data : this.data,
            constraints : constraints,
        }
    }
}