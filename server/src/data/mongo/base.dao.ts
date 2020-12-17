import { isNil } from 'lodash';
import { Collection, OptionalId } from 'mongodb';

export class BaseDao<TSchema extends Record<string, any>> {
    constructor(protected collection: Collection<TSchema>) {}

    public async get(params: Partial<TSchema>): Promise<TSchema[]> {
        return this.collection.find(params).toArray();
    }

    public async getOne(params: Partial<TSchema>): Promise<TSchema> {
        const result = await this.collection.find(params, { limit: 1 }).next();
        if (result === null) throw new Error('No entity found'); // Refactor this later
        return result;
    }

    public async post(param: OptionalId<TSchema>): Promise<number> {
        return (await this.collection.insertOne(param)).insertedCount;
    }

    public async patch(
        params: Partial<TSchema>,
        payload: TSchema
    ): Promise<TSchema> {
        return this.put(params, payload, false);
    }

    public async put(
        params: Partial<TSchema>,
        payload: TSchema,
        upsert = false
    ): Promise<TSchema> {
        const updated = (
            await this.collection.findOneAndUpdate(params, payload, { upsert })
        ).value;

        if (isNil(updated)) throw new Error('Not found');
        return updated;
    }

    public async delete(params: Partial<TSchema>): Promise<boolean> {
        return Boolean((await this.collection.findOneAndDelete(params)).ok);
    }
}
