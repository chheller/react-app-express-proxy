import { CRUDRepository } from './CRUDRepository.d';
import { UserController } from '../feature/user/user.controller';
import { ServiceResponse } from '../../model/response';
import { AuditableSchema } from '../../data/mongo/auditable.dao';
import { SoftDeleteableSchema } from '../../data/mongo/soft-delete.dao';

export interface User {
    givenName: string;
    familyName: string;
    preferredName: string;
    emailAddress: string;
    userId: string;
    avatarUrl: string;
}

export type UserDTO = Omit<User, 'id'>;

export interface IUserService {
    fetchUser(user: Partial<User>): Promise<ServiceResponse<User>>;
    fetchUsers(
        users: Partial<User>[]
    ): Promise<ServiceResponse<User[], Partial<User>[]>>;
    updateUser(
        user: Partial<User>
    ): Promise<ServiceResponse<[number, ...User[]]>, User>;
    deleteUser(
        user: Partial<User>
    ): Promise<ServiceResponse<booelan, Partial<User>>>;
    createUser(user: UserDTO): Promise<ServiceResponse<User, UserDTO>>;
}

export interface UserSchema
    extends User,
        AuditableSchema,
        SoftDeleteableSchema {}
