import { FilterQuery, OptionalId } from 'mongodb';
import { BaseDao } from './base.dao';
import { Constructor, OptId } from './model';

export function SoftDeletable<TSchema extends SoftDeleteableSchema>(
    Base: Constructor<BaseDao<TSchema>>
) {
    return class SoftDeletable extends Base {
        public async get(params: Partial<TSchema>) {
            return super.get({ ...params, isDeleted: 0 });
        }

        public async getOne(params: Partial<TSchema>) {
            return super.getOne({ ...params, isDeleted: 0 });
        }

        public async post(params: OptionalId<TSchema>) {
            return super.post({ ...params, isDeleted: 0 });
        }

        public async delete(params: Partial<TSchema>) {
            const filterQuery: FilterQuery<TSchema> = Object.entries(
                params
            ).reduce((acc, [key, value]) => {
                return { ...acc, [key]: value };
            }, {});

            /// @ts-expect-error Something is fucky with this type
            const result = await this.collection.findOneAndUpdate(filterQuery, {
                $set: { isDeleted: 1 },
            });

            return Boolean(result.ok);
        }
    };
}

export interface SoftDeleteableSchema extends OptId {
    isDeleted: 0 | 1;
}
