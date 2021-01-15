import { decorate, injectable } from '../common/ioc';
import { BaseRepository } from '../db/mongo/mongo.repository';
import { sanitizeSearchQuery } from '../db/mongo/sanitize';
import { FindOptions } from '../db/Repository';

export abstract class BaseService<Entity extends Record<string, any>> {
    protected repository!: BaseRepository<Entity>;

    public findById(id: string): Promise<Entity> {
        return this.repository.findOne({ id });
    }

    public find(
        unsanitizedQuery: any,
        options?: FindOptions
    ): Promise<Entity[]> {
        const sanitizedQuery = sanitizeSearchQuery(unsanitizedQuery);
        return this.repository.find(sanitizedQuery, options);
    }

    public create(entity: Entity): Promise<Entity> {
        return this.repository.create(entity);
    }
}

decorate(injectable(), BaseService);
