import { MongoRepository } from '@chheller/repository-provider';
import { inject } from 'inversify';
import { Connection, Schema } from 'mongoose';
import { provideSingleton } from '../../common/ioc';
import Logger from '../../common/logger';
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
      ),
      Logger.child('UserRepository')
    );
  }
}
