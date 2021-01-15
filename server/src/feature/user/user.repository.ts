import { Connection, Schema } from 'mongoose';
import { BaseRepository } from '../../adapters/mongo/mongo.repository';
import { inject, provideSingleton } from '../../common/ioc';
import { User } from './user.model';

@provideSingleton(UserRepository)
export class UserRepository extends BaseRepository<User> {
    constructor(@inject(Connection) connection: Connection) {
        super(
            connection,
            'users',
            new Schema({
                givenName: String,
                familyName: String,
                preferredName: String,
                emailAddress: String,
                userId: String,
                avatarUrl: String,
            })
        );
    }
}
