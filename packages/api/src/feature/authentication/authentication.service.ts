import { provideSingleton } from '../../common/ioc';
import { BaseService } from '../service';
import { AuthenticationModel } from './authentication.model';

@provideSingleton(AuthenticationService)
export default class AuthenticationService extends BaseService<AuthenticationModel> {}
