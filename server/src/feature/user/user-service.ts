import { IUserService, User, UserDTO } from './user-model';
import { UserRepository } from './user-repo';
export class UserService implements IUserService {
    constructor(private readonly repo = new UserRepository()) {}

    async fetchUser(user: Partial<User>): Promise<User> {
        return (await this.repo.read(user))[0];
    }
    async fetchUsers(users: Partial<User>[]): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    async updateUser(user: Partial<User>): Promise<[number, ...User[]]> {
        return this.repo.update(user);
    }
    async deleteUser(user: Partial<User>): Promise<boolean> {
        return this.repo.delete(user);
    }
    async createUser(user: UserDTO): Promise<User> {
        return this.repo.create(user);
    }
}
