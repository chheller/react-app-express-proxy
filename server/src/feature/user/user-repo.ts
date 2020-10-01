import { CRUDRepository } from '../../model/CRUDRepository';
import { User, UserDTO } from './user-model';

export class UserRepository implements CRUDRepository<User> {
    create(params: UserDTO): Promise<User> {
        throw new Error('Method not implemented.');
    }
    read(params: Partial<User>): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    update(params: Partial<User>): Promise<[number, ...User[]]> {
        throw new Error('Method not implemented.');
    }
    delete(params: Partial<User>): boolean {
        throw new Error('Method not implemented.');
    }
}
