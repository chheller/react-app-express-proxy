import { OptionalId } from 'mongodb';
import { BaseDao } from './base.dao';
import { Constructor, OptId } from './model';

export function Auditable<
    TSchema extends Record<string, any> & AuditableSchema
>(Base: Constructor<BaseDao<TSchema>>) {
    return class Auditable extends Base {
        public async post(param: OptionalId<TSchema>) {
            return super.post({
                ...param,
                createdAt: new Date(new Date().toUTCString()),
                createdBy: param.userId,
            });
        }
    };
}

export interface AuditableSchema extends OptId {
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}
