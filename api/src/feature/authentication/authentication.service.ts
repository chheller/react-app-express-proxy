import { provideSingleton } from '../../common/ioc';
import { BaseService } from '../service';
import { UserRepository } from '../user/user.repository';
import { AuthenticationModel } from './authentication.model';

@provideSingleton(UserRepository)
export default class AuthenticationService extends BaseService<AuthenticationModel> {}
