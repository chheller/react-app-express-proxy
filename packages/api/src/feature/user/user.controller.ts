import { inject } from 'inversify';
import { Body, Delete, Get, Patch, Path, Post, Query, Route } from 'tsoa';
import { provideSingleton } from '../../common/ioc';
import BaseController from '../base-controller';
import { SortOptions } from '../base-crud-repository';
import { CreateUserDTO } from './user.model';
import { UserService } from './user.service';

@Route('users')
@provideSingleton(UserController)
export class UserController extends BaseController {
  constructor(@inject(UserService) private service: UserService) {
    super();
    this.logger.info('Creating User Controller');
  }

  @Get(':id')
  async getUser(@Path('id') userId: string) {
    this.logger.debug('Querying user', { userId, method: 'getUser' });
    const user = await this.service.findById({ userId });
    if (user == null) {
      this.logger.debug('User not found', { userId, method: 'getUser' });
    } else {
      this.logger.debug('Found user', { userId, user, method: 'getUser' });
    }
    return user;
  }

  @Get(':attribute/:value')
  async getUsers(
    @Path('attribute') attribute: string,
    @Path('value') value: any,
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: SortOptions
  ) {
    this.logger.info('Querying users', {
      method: 'getUsers',
      params: {
        [attribute]: value,
        skip,
        limit,
        sort,
      },
    });
    return this.service.find({ [attribute]: value }, { skip, limit, sort });
  }

  @Post('')
  async createUser(@Body() user: CreateUserDTO) {
    this.logger.info('Creating new user', { user, method: 'createUser' });
    return this.service.create(user);
  }

  @Patch(':userId')
  async updateUser(
    @Path('userId') userId: string,
    @Body() userPatch: Partial<CreateUserDTO>
  ) {
    this.logger.info('Updating User', {
      userId,
      user: userPatch,
      method: 'updateUser',
    });
    const updatedUser = await this.service.update(userId, userPatch);
    if (updatedUser == undefined) {
      this.logger.info(`Found no user with userId:${userId}`);
      this.setStatus(404);
      return { error: 'Error finding user with given userId' };
    }
    this.logger.info(`Found and updated user with userId:${userId}`, {
      updatedUser,
    });
    return updatedUser;
  }

  @Delete(':userId')
  async deleteUser(@Path('userId') userId: string) {
    this.logger.info('Deleting user', { userId, method: 'deleteUser' });
    return this.service.delete(userId);
  }
}
