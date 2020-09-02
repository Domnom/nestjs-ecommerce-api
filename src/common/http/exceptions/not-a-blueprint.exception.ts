import {
    UnprocessableEntityException as NestJsUnprocessableEntityException
} from '@nestjs/common'

import { ApiProperty } from '@nestjs/swagger'

/**
 * Used when a playbook is selected to be used as a blueprint but it is not
 * This is determined as the playbook will have:
 * blueprint_url === undefined
 * blueprint_playbook === ObjectId (reference to another playbook)
 *
 * @export
 * @class NotABlueprintException
 * @extends {NestJsUnprocessableEntityException}
 */
export class NotABlueprintException extends NestJsUnprocessableEntityException
{
    @ApiProperty({
        description: "A message describing the error",
        default: "This playbook '{workspace}/{playbookName}' is not a blueprint",
        example: "This playbook 'johndoe/example-playbook' is not a blueprint"
    })
    message : string;

    /**
     * Creates an instance of NotABlueprintException.
     * 
     * @param {string} workspace
     * @param {string} playbookName
     * @memberof NotABlueprintException
     */
    constructor(workspace: string, playbookName : string)
    {
        super({
            message : "The playbook '" + workspace + "/" + playbookName + "' is not a blueprint"
        })
    }
}