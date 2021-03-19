import { decorate, injectable } from '../common/ioc';
import Logger from '../common/logger';
import { BaseRepository } from '../db/mongo/mongo.repository';
import { sanitizeSearchQuery } from '../db/mongo/sanitize';
import { FindOptions } from '../db/Repository';

export abstract class BaseService<Entity extends Record<string, any>> {
  protected repository!: BaseRepository<Entity>;
  protected logger = Logger.child({ service: 'Base Service' });
  public findById(id: string): Promise<Entity> {
    return this.repository.findOne({ id });
  }

  public find(unsanitizedQuery: any, options?: FindOptions): Promise<Entity[]> {
    const sanitizedQuery = sanitizeSearchQuery(unsanitizedQuery);
    this.logger.info(sanitizedQuery);
    return this.repository.find(sanitizedQuery, options);
  }

  public create(entity: Entity): Promise<Entity> {
    return this.repository.create(entity);
  }
}

decorate(injectable(), BaseService);
