import { inject } from 'inversify';
import { v4 } from 'uuid';
import { provideSingleton } from '../../common/ioc';
import { BaseService } from '../service';
import { CreateUserDTO, User } from './user.model';
import { UserRepository } from './user.repository';

@provideSingleton(UserService)
export class UserService extends BaseService<User> {
  constructor(@inject(UserRepository) protected repository: UserRepository) {
    super();
  }

  public async create(user: CreateUserDTO): Promise<User> {
    return super.create({ ...user, userId: v4() });
  }

  public async update(
    userId: string,
    user: Partial<CreateUserDTO>
  ): Promise<User | null> {
    return super.update({ userId }, user);
  }
}
