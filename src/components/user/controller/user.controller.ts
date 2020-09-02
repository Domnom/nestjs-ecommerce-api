import {
    Controller, 
    Get,
    Post,
    Body,
    Param,
    Query,
    Delete,
    Put,
    BadRequestException
} from '@nestjs/common';

import {
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiOkResponse,
    
    ApiParam
} from '@nestjs/swagger';

/**
 * @import Decorators
 */
import {
    ApiAllErrorResponses
} from '../../../common/decorators/error-response.decorator'

/**
 * @import Dtos
 */
import {
    CreateUserDto,
    UpdateUserDto
} from '../dtos';

/**
 * @import Models
 */
import {
    User
} from '../models';

/**
 * @import Services
 */
import { UserService } from '../services';

/**
 * @import Interfaces
 */
import { IUserMongoose } from '../interfaces';


@Controller('user')
export class UserController {
    
    constructor(
        private readonly userService: UserService
    )
    {}

    @Get(':id')
    @ApiOperation({
        summary: "Get a single user"
    })
    @ApiOkResponse({
        type : User
    })
    @ApiParam({
        name : "id",
        description : "The user id"
    })
    @ApiAllErrorResponses()
    async findById(
        @Param('id') id: string
    ): Promise<User>
    {
        try
        {
            let userData: IUserMongoose = await this.userService.findById(id);

            return new User(userData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Post()
    @ApiOperation({
        summary : "Create a new user"
    })
    @ApiBody({
        type : CreateUserDto
    })
    @ApiOkResponse({
        type : User
    })
    @ApiAllErrorResponses()
    async create(
        @Body() createUserDto: CreateUserDto
    ): Promise<User>
    {
        try
        {
            let userData: IUserMongoose = await this.userService.create(createUserDto);
            
            return new User(userData);
        }
        catch(err)
        {
            throw err;
        }
    }



    @Put(':id')
    @ApiOperation({
        summary : "Update the details of an existing user"
    })
    @ApiParam({
        name : "id",
        description : "The id of the user that will be updated"
    })
    @ApiBody({
        type : UpdateUserDto
    })
    @ApiOkResponse({
        type : User
    })
    @ApiAllErrorResponses()
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User>
    {
        try
        {
            let userData: IUserMongoose = await this.userService.update(id, updateUserDto);

            return new User(userData);
        }
        catch(err)
        {
            throw err;
        }
    }


    @Delete(':id')
    @ApiOperation({
        summary : "Deletes a single user"
    })
    @ApiParam({
        name : "id",
        description : "The id of the user that will be updated"
    })
    @ApiOkResponse({
        type : User
    })
    @ApiAllErrorResponses()
    async delete(
        @Param('id') id: string
    ): Promise<User>
    {
        try
        {
            let userData: IUserMongoose = await this.userService.delete(id);

            return new User(userData);
        }
        catch(err)
        {
            throw err;
        }
    }
}