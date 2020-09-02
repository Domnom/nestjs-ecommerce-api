import {
    ConflictException as NestJsConflictException
} from '@nestjs/common'

import { ApiProperty } from '@nestjs/swagger'

/**
 * Used when we try to create a draft for a blueprint_version but the chosen version already
 * has a draft
 *
 * @export
 * @class BlueprintDraftExistsException
 * @extends {NestJsUnprocessableEntityException}
 */
export class BlueprintDraftExistsException extends NestJsConflictException
{
    /**
     * Creates an instance of BlueprintDraftExistsException.
     * 
     * @param {string} workspace
     * @param {string} playbookName
     * @param {string} version
     * @memberof BlueprintDraftExistsException
     */
    constructor(workspace: string, playbookName : string, version: string, draft_blueprint_git_checkout_ref: string)
    {
        super({
            message : "A draft already exists at the path '" + workspace + "/" + playbookName + "/" + version + "'. The blueprint files have been saved to the branch/tag name of '" + draft_blueprint_git_checkout_ref + "'"
        })
    }
}