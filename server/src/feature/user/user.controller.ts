import { Body, Controller, Get, Path, Post, Query, Route } from 'tsoa';
import { SortOptions } from '../../data/Repository';
import { inject, provideSingleton } from '../../ioc';
import Logger from '../../log/logger';
import { User } from './user.model';
import { UserService } from './user.service';

@Route('users')
@provideSingleton(UserController)
export class UserController extends Controller {
    private logger = Logger.child({ controller: 'User Controller' });
    constructor(@inject(UserService) private service: UserService) {
        super();
        this.logger.info('Creating User Controller');
    }
    @Get(':id')
    async getUser(@Path('id') userId: string) {
        try {
            this.logger.info('Fetching user');
            return this.service.find({ userId });
        } catch (err) {
            this.logger.error(err);
            throw new Error('User not found');
        }
    }

    @Get(':attribute/:value')
    async getUsers(
        @Path('attribute') attribute: string,
        @Path('value') value: any,
        @Query('skip') skip?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: SortOptions
    ) {
        return this.service.find({ [attribute]: value }, { skip, limit, sort });
    }

    @Post('')
    async createUser(@Body() user: User) {
        console.log('Creating User');
        return this.service.create(user);
    }
}
