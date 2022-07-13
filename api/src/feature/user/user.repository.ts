import { Connection, Schema } from 'mongoose';
import { inject, provideSingleton } from '../../common/ioc';
import { MongoRepository } from '../../db/mongo/mongo.repository';
import { User } from './user.model';

@provideSingleton(UserRepository)
export class UserRepository extends MongoRepository<User> {
  constructor(@inject(Connection) connection: Connection) {
    super(
      connection,
      'user',
      new Schema(
        {
          givenName: String,
          familyName: String,
          preferredName: String,
          emailAddress: String,
          userId: String,
          avatarUrl: String,
        },
        { versionKey: false }
      )
    );
  }
}
