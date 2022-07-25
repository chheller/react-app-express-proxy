import { ObjectId } from 'mongodb';

export interface AuthenticationModel {
  userId: ObjectId;
  password: string;
  modifiedAt: string;
  modifiedBy: ObjectId;
}

export interface CreateAuthenticationBody {
  userId: string;
  /** @minLength 8 Password must be at least 8 characters */
  /** @maxLength 71 Password must be no more than 71 characters */
  password: string;
}

export interface ValidateCredentailBody {
  userId: string;
  /** @minLength 8 Password must be at least 8 characters */
  /** @maxLength 71 Password must be no more than 71 characters */
  password: string;
}
