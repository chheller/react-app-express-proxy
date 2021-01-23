import { Body, Controller, Get, Path, Post, Query, Route } from 'tsoa';
import { inject, provideSingleton } from '../../common/ioc';
import Logger from '../../common/logger';
import { SortOptions } from '../../db/Repository';
import { CreateUserDTO } from './user.model';
import { UserService } from './user.service';

@Route('users')
@provideSingleton(UserController)
export class UserController extends Controller {
  private logger = Logger.child({ controller: 'User Controller' });
  constructor(@inject(UserService) private service: UserService) {
    super();
    console.log('Creating user controller');
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
  async createUser(@Body() user: CreateUserDTO) {
    console.log('Creating User');
    return this.service.create(user);
  }
}
