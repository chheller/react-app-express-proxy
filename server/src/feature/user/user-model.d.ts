import { CRUDRepository } from '../../model/CRUDRepository';
import { UserController } from './user-controller';

export interface User {
    id: string;
    givenName: string;
    familyName: string;
    preferredName: string;
    emailAddress: string;
    userId: string;
    avatarUrl: string;
}

export type UserDTO = Omit<User, 'id'>;

export interface IUserService {
    fetchUser(user: Partial<User>): Promise<User>;
    fetchUsers(user: Partial<User>[]): Promise<User[]>;
    updateUser(user: Partial<User>): Promise<[number, ...User[]]>;
    deleteUser(user: Partial<User>): Promise<booelan>;
    createUser(user: UserDTO): Promise<User>;
}
