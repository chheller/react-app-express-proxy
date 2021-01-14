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
