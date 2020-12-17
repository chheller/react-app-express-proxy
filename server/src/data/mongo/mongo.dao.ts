import { Auditable, AuditableSchema } from './auditable.dao';
import { BaseDao } from './base.dao';
import { SoftDeletable, SoftDeleteableSchema } from './soft-delete.dao';

export function StandardDao<
    TModel,
    TSchema extends TModel & AuditableSchema & SoftDeleteableSchema
>() {
    return Auditable<TSchema>(SoftDeletable<TSchema>(BaseDao));
}
