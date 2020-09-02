import {
    ValidationError
} from './validation.error';

import { 
    ValidatorError
} from './validator.error';


describe("ValidationError", () => {

    let message = "Unique validation message";
    let validationError: ValidationError;

    it ("Should create a ValidationError", () => {

        const defaultMessage = "Validation failed";
        const defaultValidationError = new ValidationError();
        
        
        expect(defaultValidationError).toHaveProperty("message", defaultMessage)
        expect(defaultValidationError).toHaveProperty("validators", []);

        expect(defaultValidationError.toJson()).toMatchObject({
            message : defaultMessage,
            errors : {}
        });

    })

    it ("Should create a validation error with a custom message", () => {

        validationError = new ValidationError(message);
        
        expect(validationError).toHaveProperty('message', message);

    })

    it ("Should add validator errors to the validation error", () => {

        let catNameValidator = new ValidatorError('cat_name', "The cat name is bad");
        let hasKidsValidator = new ValidatorError('has_kids', "has_kids value is not a valid value");

        validationError.addValidator(catNameValidator);
        validationError.addValidator(hasKidsValidator);

        expect(validationError.validators).toHaveLength(2);
        expect(validationError.toJson()).toMatchObject({
            message : message,
            errors : {
                cat_name : catNameValidator.toJson(),
                has_kids : hasKidsValidator.toJson()
            }
        })

    })

})