import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
} from 'tsoa';
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
    this.logger.info('Creating User Controller');
  }
  @Get(':id')
  async getUser(@Path('id') userId: string) {
    this.logger.info('Fetching user', { userId });
    return this.service.findById(userId);
  }

  @Get(':attribute/:value')
  async getUsers(
    @Path('attribute') attribute: string,
    @Path('value') value: any,
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: SortOptions
  ) {
    this.logger.info('Updating user', {
      [attribute]: value,
      skip,
      limit,
      sort,
    });
    return this.service.find({ [attribute]: value }, { skip, limit, sort });
  }

  @Post('')
  async createUser(@Body() user: CreateUserDTO) {
    this.logger.info('Creating user', { user });
    return this.service.create(user);
  }
  @Patch(':userId')
  async updateUser(@Body() userPatch: Partial<CreateUserDTO>) {
    this.logger.info('Updating user', { user: userPatch });
    throw new Error('Method not implemented');
    // return this.service.update(user)
  }
  @Delete(':userId')
  async deleteUser(@Path('userId') userId: string) {
    return this.service.delete(userId);
  }
}