import { Schema } from 'mongoose';
import { MongoDbConnection } from '../../data/mongo/mongo-db';
import { BaseRepository } from '../../data/mongo/mongo.repository';
import { inject, provideSingleton } from '../../ioc';
import { User } from './user.model';

@provideSingleton(UserRepository)
export class UserRepository extends BaseRepository<User> {
    protected modelName = 'users';
    protected schema = new Schema({
        givenName: String,
        familyName: String,
        preferredName: String,
        emailAddress: String,
        userId: String,
        avatarUrl: String,
    });

    constructor(
        @inject(MongoDbConnection) protected connection: MongoDbConnection
    ) {
        super();
    }
}
