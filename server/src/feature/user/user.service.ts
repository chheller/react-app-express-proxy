import { inject, provideSingleton } from '../../common/ioc';
import log from '../../common/logger';
import { BaseService } from '../service';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@provideSingleton(UserService)
export class UserService extends BaseService<User> {
  protected logger = log.child({ service: 'users' });
  constructor(@inject(UserRepository) protected repository: UserRepository) {
    super();
  }
}
