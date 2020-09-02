import {
    ValidatorConstraintError,
    EnumValidatorConstraintError,
    EmailValidatorConstraintError,
    MaxLengthValidatorConstraintError,
    MinLengthValidatorConstraintError,
    MaxValidatorConstraintError,
    MinValidatorConstraintError,
    MatchValidatorConstraintError,
    RequiredValidatorConstraintError,
    UniqueValidatorConstraintError,
    InvalidTypeValidatorConstraintError
} from './validator-constraint.error';

describe("ValidatorConstraintError", () => {

    it ("Should create an error with a type and description", () => {

        const type = "Test type";
        const description = "Test description";

        const constraintError: ValidatorConstraintError = new ValidatorConstraintError("Test type", "Test description");

        expect(constraintError).toHaveProperty('type', type);
        expect(constraintError).toHaveProperty('description', description);
        
        expect(constraintError.toJson()).toMatchObject({
            description: description
        })

    })
})


describe("EnumValidatorConstraintError", () => {

    let enumValues = [
        "value1",
        "value2"
    ]

    it ("Should create an error with type enum", () => {

        const description = "The value must match one of the given enum values";

        const constraintError: EnumValidatorConstraintError = new EnumValidatorConstraintError(enumValues);

        expect(constraintError).toHaveProperty('type', 'enum');
        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('enumValues', enumValues);

        expect(constraintError.toJson()).toMatchObject({
            description : description,
            enumValues: enumValues
        })
    })

    it ("Should create an error with custom description", () => {

        const description = "Custom description"
        
        const constraintError: EnumValidatorConstraintError = new EnumValidatorConstraintError(enumValues, description);

        expect(constraintError).toHaveProperty('type', 'enum');
        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('enumValues', enumValues);

        expect(constraintError.toJson()).toMatchObject({
            description : description,
            enumValues: enumValues
        })

    })

})


describe("EmailValidatorConstraintError", () => {

    it ("Should create an error of type email", () => {

        const description = "The value must be a valid email";
        const constraintError: EmailValidatorConstraintError = new EmailValidatorConstraintError()

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'email');

        expect(constraintError.toJson()).toMatchObject({
            description : description
        })

    })

})


describe("MaxLengthValidatorConstraintError", () => {

    it ("Should create an error of type maxlength", () => {

        const maxLength = 5;
        const description = "The value must have a maximum character length of '" + maxLength + "'";

        const constraintError: MaxLengthValidatorConstraintError = new MaxLengthValidatorConstraintError(maxLength)

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'maxLength');
        expect(constraintError).toHaveProperty('maxLength', maxLength);

        expect(constraintError).toMatchObject({
            description : description,
            maxLength : maxLength
        })

    })

})

describe("MinLengthValidatorConstrainError", () => {

    it ("Should create an error of type minlength", () => {

        const minLength = 2;
        const description = "The value must have a minimum character length of '" + minLength + "'";

        const constraintError: MinLengthValidatorConstraintError = new MinLengthValidatorConstraintError(minLength)

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'minLength');
        expect(constraintError).toHaveProperty('minLength', minLength);

        expect(constraintError).toMatchObject({
            description : description,
            minLength : minLength
        })

    })

})

describe("MaxValidatorConstrainError", () => {

    it ("Should create an error of type max", () => {

        const max = 5;
        const description = "The value must have a maximum numeric value of '" + max + "'";

        const constraintError: MaxValidatorConstraintError = new MaxValidatorConstraintError(max)

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'max');
        expect(constraintError).toHaveProperty('max', max);

        expect(constraintError).toMatchObject({
            description : description,
            max : max
        })

    })

})

describe("MinValidatorConstraintError", () => {

    it ("Should create an error of type min", () => {

        const min = 2;
        const description = "The value must have a minimum numeric value of '" + min + "'";

        const constraintError: MinValidatorConstraintError = new MinValidatorConstraintError(min)

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'min');
        expect(constraintError).toHaveProperty('min', min);

        expect(constraintError).toMatchObject({
            description : description,
            min : min
        })

    })

})


describe("MatchValidatorConstraintError", () => {

    it ("Should create an error of type match", () => {

        const description = "The value does not match a given string pattern";
        
        const constraintError: MatchValidatorConstraintError = new MatchValidatorConstraintError();

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'match');

        expect(constraintError).toMatchObject({
            description : description
        })

    })

    it ("Should create an error with a custom description", () => {

        const description = "The value needs to start with tag-";

        const constraintError: MatchValidatorConstraintError = new MatchValidatorConstraintError(description);

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'match');

        expect(constraintError).toMatchObject({
            description : description
        })
    })

})



describe("RequiredValidatorConstraintError", () => {

    it ("Should create an error of type required", () => {

        const description = "This property is required";
        
        const constraintError: RequiredValidatorConstraintError = new RequiredValidatorConstraintError();

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'required');

        expect(constraintError.toJson()).toMatchObject({
            description : description
        })

    })

    it ("Should create an error of type required with many required properties", () => {

        const description = "These properties are required";
        const requiredProperties: string[] = [
            "test-prop-1",
            "test-prop-2"
        ]
        const constraintError: RequiredValidatorConstraintError = new RequiredValidatorConstraintError();
        requiredProperties.forEach((requiredProp: string) => {
            constraintError.addProperty(requiredProp);
        })

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError.toJson()).toMatchObject({
            description : description,
            requiredProperties : requiredProperties
        })
    })

})


describe("UniqueValidatorConstraintError", () => {

    it ("Should create an error of type unique", () => {

        const description = "This value must be unique";
        
        const constraintError: UniqueValidatorConstraintError = new UniqueValidatorConstraintError();

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'unique');

        expect(constraintError).toMatchObject({
            description : description
        })

    })

})


describe("InvalidTypeValidatorConstraintError", () => {

    it ("Should create an error of type invalidType", () => {

        const valueTypes = ["boolean"]
        const description = "This value must be one of the following types: " + valueTypes.join(', ');
        
        const constraintError: InvalidTypeValidatorConstraintError = new InvalidTypeValidatorConstraintError(valueTypes);

        expect(constraintError).toHaveProperty('description', description);
        expect(constraintError).toHaveProperty('type', 'invalidType');
        expect(constraintError).toHaveProperty('valueTypes', valueTypes);

        expect(constraintError.toJson()).toMatchObject({
            description : description,
            valueTypes : valueTypes
        })

    })

    it ("Should create an invalidType error with custom message and data", () => {

        const valueTypes = ["type"];
        const description = "The value must be a percentage!";

        const constraintError: InvalidTypeValidatorConstraintError = new InvalidTypeValidatorConstraintError(valueTypes, description);

        expect(constraintError.toJson()).toMatchObject({
            description : description,
            valueTypes : valueTypes
        })

    })

})