import { decorate, injectable } from '../common/ioc';
import Logger from '../common/logger';
import { BaseRepository } from '../db/mongo/mongo.repository';
import { sanitizeSearchQuery } from '../db/mongo/sanitize';
import { FindOptions } from '../db/Repository';

export abstract class BaseService<Entity extends Record<string, any>> {
  protected repository!: BaseRepository<Entity>;
  protected logger = Logger.child({ service: 'Base Service' });
  public findById(id: { [key: string]: string }): Promise<Entity | null> {
    this.logger.info('Finding entity by id', id);
    return this.repository.findOne(id);
  }

  public find(unsanitizedQuery: any, options?: FindOptions): Promise<Entity[]> {
    const sanitizedQuery = sanitizeSearchQuery(unsanitizedQuery);
    this.logger.info(sanitizedQuery);
    return this.repository.find(sanitizedQuery, options);
  }

  public update(query: any, entity: Partial<Entity>): Promise<Entity | null> {
    return this.repository.update(query, entity);
  }

  public create(entity: Entity): Promise<Entity> {
    return this.repository.create(entity);
  }

  public delete(entityId: string): Promise<number> {
    return this.repository.delete({ id: entityId });
  }
}

decorate(injectable(), BaseService);
