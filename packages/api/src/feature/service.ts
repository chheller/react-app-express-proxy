import { decorate, injectable } from 'inversify';
import {
  BaseCRUDRepository,
  FindOptions,
  sanitizeSearchQuery,
} from 'repository-provider';
import Logger from '../common/logger';

export abstract class BaseService<Entity extends Record<string, any>> {
  protected repository!: BaseCRUDRepository<Entity>;
  protected logger = Logger.child({
    name: this.constructor.name,
  });

  public findById(id: { [key: string]: string }): Promise<Entity | null> {
    this.logger.info('Finding entity by id', id);
    return this.repository.findOne(id);
  }

  public find(unsanitizedQuery: any, options?: FindOptions): Promise<Entity[]> {
    const sanitizedQuery = sanitizeSearchQuery(unsanitizedQuery);
    this.logger.info(sanitizedQuery);
    return this.repository.findMany(sanitizedQuery, options);
  }

  public update(query: any, entity: Partial<Entity>): Promise<Entity | null> {
    return this.repository.updateOne(query, entity);
  }

  public create(entity: Entity): Promise<Entity> {
    return this.repository.createOne(entity);
  }

  public delete(entityId: string): Promise<void> {
    return this.repository.deleteOne({ id: entityId });
  }
}

decorate(injectable(), BaseService);
