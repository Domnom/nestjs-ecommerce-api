import {
    applyDecorators,
    NotFoundException,
    UnprocessableEntityException,
    ConflictException,
    InternalServerErrorException
} from '@nestjs/common'

/**
 * @import Libraries
 */
import {
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiUnprocessableEntityResponse,
    ApiConflictResponse,
    ApiInternalServerErrorResponse
} from '@nestjs/swagger';



export function ApiAllErrorResponses(): any {
    return applyDecorators(
        ApiNotFoundResponse({
            type : NotFoundException,
            description: "NestJS built in NotFoundException"
        }),
        ApiUnprocessableEntityResponse({
            type : UnprocessableEntityException,
            description: "NestJS built in UnprocessableEntityException" 
        }),
        ApiConflictResponse({
            type : ConflictException,
            description: "NestJS built in ConflictException"
        }),
        ApiInternalServerErrorResponse({
            type : InternalServerErrorException,
            description: "NestJS built in InternalServerErrorException"
        })
    )
}