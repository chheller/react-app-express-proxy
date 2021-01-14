import { BaseRepository } from '../data/mongo/mongo.repository';
import { sanitizeSearchQuery } from '../data/mongo/sanitize';
import { FindOptions } from '../data/Repository';
import { decorate, injectable } from '../ioc';

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
