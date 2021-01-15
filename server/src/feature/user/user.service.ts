import { inject, provideSingleton } from '../../common/ioc';
import { BaseService } from '../service';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@provideSingleton(UserService)
export class UserService extends BaseService<User> {
    constructor(@inject(UserRepository) protected repository: UserRepository) {
        super();
    }
}
