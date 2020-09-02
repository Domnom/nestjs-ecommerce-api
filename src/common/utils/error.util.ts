/**
 * @import Errors
 */
import {
    Error as MongooseError
} from 'mongoose';

import {
    MongooseValidatorError
} from './../errors/mongoose/validator-error';

import {
    ExtendedMongoError
} from '../errors/mongo/mongo-error';

import {
    ValidationError
} from './../errors/validation/validation.error';

import {
    ValidatorError
} from './../errors/validation/validator.error';

import {
    ValidatorConstraintError,
    MaxLengthValidatorConstraintError,
    MinLengthValidatorConstraintError,
    MaxValidatorConstraintError,
    MinValidatorConstraintError,
    EmailValidatorConstraintError,
    EnumValidatorConstraintError,
    MatchValidatorConstraintError,
    RequiredValidatorConstraintError,
    UniqueValidatorConstraintError,
    InvalidTypeValidatorConstraintError
} from './../errors/validation/validator-constraint.error';



/**
 * @import Exceptions
 */
import {
    HttpException,
    ImATeapotException,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException as NestJsNotFoundException
} from "@nestjs/common"

import {
    ValidationException
} from './../http/exceptions/validation.exception';


/**
 * @description Takes in any error and transforms it into a nest HttpException error
 */
export const errorTransformer = (err: any): HttpException => {

    // -- Return any errors that are already HttpExceptions
    if (err instanceof HttpException) {
        return err;
    }

    return handleUnknownErrors(err)
}

export const handleUnknownErrors = (err: any): HttpException => {

    let error: HttpException = new ImATeapotException("Short and stout, here is my error that wasnt found")

    // -- Handle any MongooseValidationErrors
    if (err) {
        if (err instanceof MongooseError.ValidationError) {
            err as MongooseError.ValidationError;

            // -- Create the validator error that we will use to generate the response body for the ValidationException
            let validationError: ValidationError = new ValidationError(err.message);

            for (let property in err.errors) {
                const errorBody: MongooseValidatorError | MongooseError.CastError = err.errors[property];
                const validatorError: ValidatorError = new ValidatorError(property, errorBody.message)

                // -- Check for casting errors first as the 'kind' property will be the expected value type.
                if (errorBody.name === "CastError") {
                    errorBody as MongooseError.CastError;

                    const invalidTypeConstraint = new InvalidTypeValidatorConstraintError([errorBody.kind]);

                    validatorError.addConstraint(invalidTypeConstraint);
                }
                else {
                    errorBody as MongooseValidatorError;
                    let constraintError: ValidatorConstraintError;

                    switch (errorBody.kind) {
                        case "maxlength":
                            constraintError = new MaxLengthValidatorConstraintError(errorBody.properties.maxlength);
                            break;
                        case "minlength":
                            constraintError = new MinLengthValidatorConstraintError(errorBody.properties.minlength);
                            break;
                        case "max":
                            constraintError = new MaxValidatorConstraintError(errorBody.properties.max);
                            break;
                        case "min":
                            constraintError = new MinValidatorConstraintError(errorBody.properties.min);
                            break;
                        case "regexp":
                            constraintError = new MatchValidatorConstraintError();
                            break;
                        case "enum":
                            constraintError = new EnumValidatorConstraintError(errorBody.properties.enumValues);
                            break;
                        case "required":
                            constraintError = new RequiredValidatorConstraintError();
                            break;
                        default:
                            break;
                    }

                    // -- Add the constraint to the validator
                    if (constraintError) {
                        validatorError.addConstraint(constraintError);
                    }
                }

                // -- Add the validator to the validation error
                validationError.addValidator(validatorError);
            }


            error = new ValidationException(validationError);


        }
        else if (err.name === "MongoError") {
            err as ExtendedMongoError;

            if (err.code === 11000) {
                let validationError: ValidationError = new ValidationError("Validation failed: Duplicate key/s were found");

                for (let property in err.keyValue) {
                    let validatorError: ValidatorError = new ValidatorError(property, `A duplicate key was found for value \"${err.keyValue[property]}\" for property \"${property}\"`)
                    let constraints: UniqueValidatorConstraintError = new UniqueValidatorConstraintError();

                    validatorError.addConstraint(constraints);
                    validationError.addValidator(validatorError);
                }

                error = new ValidationException(validationError);
            }
            else if (err.code === 17124) {
                // -- 'The argument to $size must be an array, but was of type: missing',

            }
        }
        else if (err instanceof ValidationError) {
            error = new ValidationException(err);
        }
    }

    return error;

}