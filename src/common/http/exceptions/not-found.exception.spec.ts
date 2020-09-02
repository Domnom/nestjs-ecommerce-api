import { NotFoundException } from './not-found.exception';

describe("NotFoundException", () => {

    describe("Basic", () => {

        it ("Should create a new exception with no error messages", () => {
            const notFoundException: NotFoundException = new NotFoundException();

            expect(notFoundException.getStatus()).toBe(404);
            expect(notFoundException.getResponse()).toEqual({
                message : "Not Found"
            })
        })
        
    })

})