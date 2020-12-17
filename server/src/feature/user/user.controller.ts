import { Body, Controller, Get, Path, Post, Route } from 'tsoa';
import database from '../../data/mongo/mongo.connection';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model';

@Route('')
export class UserController extends Controller {
    constructor(
        private service = new UserService(database?.collection('user'))
    ) {
        super();
    }
    @Get('/user:id')
    async getUser(@Path('id') userId: string) {
        return this.service.get({ userId });
    }

    @Post('/user')
    async createUser(@Body() user: User) {
        return this.service.post(user as UserSchema);
    }
}
