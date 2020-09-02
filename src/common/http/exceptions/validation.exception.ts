import { 
    UnprocessableEntityException
} from "@nestjs/common";

/**
 * @import Libraries
 */
import {
    ApiProperty
} from "@nestjs/swagger";

/**
 * @import Errors
 */
import {
    ValidationError
} from '../../errors/validation/validation.error';

export class ValidationException extends UnprocessableEntityException
{
    @ApiProperty({
        description: "The error message",
        example: "Validation failed"
    })
    message: string;
    

    constructor(validationError: ValidationError)
    {
        super(validationError.toJson());
    }
}

// import { UnprocessableEntityException } from '@nestjs/common';

// import { ApiModelProperty } from '@nestjs/swagger';

// type TValidationExceptionError = {
//     property : string;
//     value : string;
//     constraints : { [property: string] : string }
// }

// export class ValidationException extends UnprocessableEntityException
// {
//     @ApiModelProperty({
//         description: "A message describing the error",
//         default: "Validation Error",
//         example: "Validation Error"
//     })
//     message : string;

//     @ApiModelProperty({
//         description: "An array of errors with the property, value and constraints that explain what the problem is",
//         example: [
//             {
//                 property: "email",
//                 value : "notanemail",
//                 constraints : {
//                     isEmail : "This email isn't valid"
//                 }
//             }
//         ]
//     })
//     errors: TValidationExceptionError[];

//     constructor(errors? : TValidationExceptionError | TValidationExceptionError[])
//     {
//         let errorBody: {message: string, errors?: TValidationExceptionError[]} = {
//             message : "Validation Error"
//         }
//         if (errors)
//         {
//             errorBody.errors = Array.isArray(errors) ? errors : [errors];
//         }
//         super(errorBody);
//     }
// }


// export class ValidatorException {

// }


// // export class ConstraintError


// // export class EnumConstaintException