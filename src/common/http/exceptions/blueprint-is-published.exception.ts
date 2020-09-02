import {
    ConflictException as NestJsConflictException
} from '@nestjs/common'

import { ApiProperty } from '@nestjs/swagger'

/**
 * Used when n attempt to publish an already published blueprint has been made
 * This is determined as the playbook will have:
 * blueprint_url === undefined
 * blueprint_playbook === ObjectId (reference to another playbook)
 *
 * @export
 * @class NotABlueprintException
 * @extends {NestJsUnprocessableEntityException}
 */
export class BlueprintIsPublishedException extends NestJsConflictException
{
    /**
     * Creates an instance of BlueprintIsPublishedException.
     * 
     * @param {string} workspace
     * @param {string} playbookName
     * @param {string} version
     * @memberof BlueprintIsPublishedException
     */
    constructor(workspace: string, playbookName : string, version: string)
    {
        super({
            message : "The playbook '" + workspace + "/" + playbookName + "' with version '" + version + "' has already been published!"
        })
    }
}