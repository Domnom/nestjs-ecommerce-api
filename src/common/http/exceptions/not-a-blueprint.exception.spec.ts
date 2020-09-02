import { NotABlueprintException } from './not-a-blueprint.exception';

describe("NotABlueprintException", () => {

    describe("Basic", () => {

        it ("Should create a new exception with no error messages", () => {

            const workspace = "john";
            const playbookName = "tester-app"

            const notABlueprintException: NotABlueprintException = new NotABlueprintException(workspace, playbookName);

            expect(notABlueprintException.getStatus()).toBe(422);
            expect(notABlueprintException.getResponse()).toEqual({
                message : "This playbook '" + workspace + "/" + playbookName + "' is not a blueprint"
            })
        })
        
    })

})