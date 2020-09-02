import { 
    UnprocessableEntityException
} from '@nestjs/common';

import {
    ValidationException
} from './validation.exception';

import {
    ValidationError
} from '../../errors/validation/validation.error';


describe("ValidationException", () => {

    it ("Should create a ValidationException which extends UnprocessableEntityException", () => {

        const validationError = new ValidationError();

        const validationException = new ValidationException(validationError);

        expect(validationException).toBeInstanceOf(UnprocessableEntityException);
        expect(validationException.getResponse()).toMatchObject(validationError.toJson());

    })

})