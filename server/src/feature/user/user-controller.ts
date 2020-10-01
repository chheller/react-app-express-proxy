import { Controller } from 'tsoa';
import { UserService } from './user-service';

export class UserController extends Controller {
    constructor(private readonly service = new UserService()) {
        super();
    }
}
