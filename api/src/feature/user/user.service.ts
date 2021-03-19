import { v4 } from 'uuid';
import { inject, provideSingleton } from '../../common/ioc';
import Logger from '../../common/logger';
import { BaseService } from '../../common/service';
import { CreateUserDTO, User } from './user.model';
import { UserRepository } from './user.repository';

@provideSingleton(UserService)
export class UserService extends BaseService<User> {
  protected logger = Logger.child({ service: 'users' });
  constructor(@inject(UserRepository) protected repository: UserRepository) {
    super();
  }

  public async create(user: CreateUserDTO): Promise<User> {
    const userId = v4();
    return super.create({ ...user, userId });
  }
}
