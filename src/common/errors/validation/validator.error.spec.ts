import {
    ValidatorError
} from './validator.error';

import {
    MinLengthValidatorConstraintError, 
    MaxLengthValidatorConstraintError
} from './validator-constraint.error';


describe("ValidatorError", () => {

    const property: string = "playbook_title";
    const message: string = "The " + property + " is not valid";

    let validatorError: ValidatorError;

    it("Should create a validator error for a single property", () => {

        validatorError = new ValidatorError(property, message);

        expect(validatorError).toHaveProperty('property', property);
        expect(validatorError).toHaveProperty('message', message);
        expect(validatorError).toHaveProperty('constraints', []);

        expect(validatorError.toJson()).toMatchObject({
            message : message,
            constraints : {}
        })

    })

    it ("Should add validator constraints to the validator error", () => {

        const minLengthConstraint = new MinLengthValidatorConstraintError(5);
        const maxLengthConstraint = new MaxLengthValidatorConstraintError(10);

        validatorError.addConstraint(minLengthConstraint);
        validatorError.addConstraint(maxLengthConstraint);

        expect(validatorError.toJson()).toMatchObject({
            message : message,
            constraints : {
                minLength : minLengthConstraint.toJson(),
                maxLength : maxLengthConstraint.toJson()
            }
        })

    })

    it ("Should create a validator when provided the optional property data", () => {

        let property = "height"
        let data = "100px";

        let validatorError = new ValidatorError(property, undefined, data);

        expect(validatorError.toJson()).toMatchObject({
            message : "There was an issue with your data",
            data : data,
            constraints : {}
        })

    })

})