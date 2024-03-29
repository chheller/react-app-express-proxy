import { decorate, injectable } from 'inversify';
import {
  CRUDRepository,
  FindOptions,
  sanitizeSearchQuery,
} from '../common/lib/repository-provider';
import Logger from '../common/logger';

export abstract class BaseService<Entity extends Record<string, any>> {
  protected repository!: CRUDRepository<Entity>;
  protected logger = Logger.child({
    name: this.constructor.name,
  });

  public findById(id: {
    [key: string]: string;
  }): Promise<Entity | null | undefined> {
    this.logger.info('Finding entity by id', id);
    return this.repository.findOne(id);
  }

  public find(unsanitizedQuery: any, options?: FindOptions): Promise<Entity[]> {
    const sanitizedQuery = sanitizeSearchQuery(unsanitizedQuery);
    this.logger.info(sanitizedQuery);
    return this.repository.findMany(sanitizedQuery, options);
  }

  public update(
    query: any,
    entity: Partial<Entity>
  ): Promise<Entity | null | undefined> {
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
