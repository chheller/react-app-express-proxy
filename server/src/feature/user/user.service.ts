import { Collection } from 'mongodb';
import { StandardDao } from '../../data/mongo/mongo.dao';
import { User, UserSchema } from './user.model';

export class UserService extends StandardDao<User, UserSchema>() {}
