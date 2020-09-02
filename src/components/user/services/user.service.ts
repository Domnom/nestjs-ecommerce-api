import { Model } from 'mongoose';
import {
    Injectable,
    Inject
} from '@nestjs/common';

/**
 * @import Constants
 */
import {
    DB_TABLE_MODELS
} from '../../../constants';


/**
 * @import Interfaces
 */
import { 
    IUserMongoose, 
} from '../interfaces';

/**
 * @import Dtos
 */
import {
    CreateUserDto, 
    UpdateUserDto
} from '../dtos';

/**
 * @import Exceptions
 */
import { NotFoundException } from '../../../common/http/exceptions/not-found.exception'

@Injectable()
export class UserService {

    constructor(
       @Inject(DB_TABLE_MODELS.user) private userModel: Model<IUserMongoose> 
    ){}

    /**
     * Searches for a user by ID. Throws a 404 exception if not found
     *
     * @param {string} id
     * @returns {Promise<IUserMongoose>}
     * @memberof UserService
     */
    async findById(id: string): Promise<IUserMongoose>
    {
        try
        {
            let userData: IUserMongoose = await this.userModel.findById(id);

            if (!userData)
            {
                throw new NotFoundException();
            }
            return userData;
        }
        catch(err)
        {
            throw err;
        }
    }
    

    /**
     * Create a new user
     *
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<IUserMongoose>}
     * @memberof UserService
     */
    async create(createUserDto: CreateUserDto): Promise<IUserMongoose>
    {
        try
        {
            const createdUser: IUserMongoose = new this.userModel(createUserDto);
            const userData: IUserMongoose = await createdUser.save();

            return userData;
        }
        catch(err)
        {
            throw err;
        }
    }


    /**
     * Finds and updates an existing user
     *
     * @param {string} id
     * @param {UpdateUserDto} updateUserDto
     * @returns {Promise<IUserMongoose>}
     * @memberof UserService
     */
    async update(id: string, updateUserDto: UpdateUserDto): Promise<IUserMongoose>
    {
        try
        {
            /*
             * findByIdAndUpdate searches for a model. If it exists then the update is immediately executed.
             *
             * If we were to manually use find + save() then there is a chance that we override data that may be updating in parallel
             */
            const userData: IUserMongoose = await this.userModel.findByIdAndUpdate(
                {
                    _id : id
                },
                updateUserDto,
                {
                    new : true
                }
            );

            if (!userData)
            {
                throw new NotFoundException();
            }
            return userData;
        }
        catch(err)
        {
            throw err;
        }
    }



    /**
     * Finds and deletes a user
     *
     * @param {string} id
     * @returns {Promise<IUserMongoose>}
     * @memberof UserService
     */
    async delete(id: string): Promise<IUserMongoose>
    {
        try
        {
            const userData: IUserMongoose = await this.userModel.findByIdAndDelete(
                {
                    _id : id
                }
            )

            if (!userData)
            {
                throw new NotFoundException();
            }
            return userData;
        }
        catch(err)
        {
            throw err;
        }
    }

}