import { injectable, unmanaged } from 'inversify';
import { Connection, Document, Model, Schema } from 'mongoose';
import { Logger as WinstonLogger } from 'winston';
import Logger from '../../common/logger';
import { FindOptions, Repository } from '../Repository';

@injectable()
export abstract class BaseRepository<Entity = Record<string, any>>
  implements Repository<Entity>
{
  protected logger: WinstonLogger;
  protected model: Model<Document<Entity>>;

  constructor(
    protected connection: Connection,
    @unmanaged() protected modelName: string,
    @unmanaged() protected schema: Schema
  ) {
    this.logger = Logger.child({ repository: this.modelName });
    this.logger.info(`Creating repository for ${this.modelName} schema.`);
    this.model = this.connection.model(this.modelName, this.schema);
    this.logger.info(
      `Created model for ${this.model.collection.name} collection`
    );
  }

  async create(entity: Entity): Promise<Entity> {
    try {
      const doc = await this.model.create(new this.model(entity));
      return doc.toJSON() as unknown as Entity;
    } catch (err) {
      this.logger.error(
        `Error on collection:${this.model.collection.name} performing create() query`,
        err
      );
      throw new Error('Error performing requested operation');
    }
  }
  update(query: any, model: Entity): Promise<[number, ...Entity[]]> {
    throw new Error('Method not implemented.');
  }
  delete(query: any): Promise<number> {
    throw new Error('Method not implemented.');
  }

  public async find(
    query: any,
    options?: Partial<FindOptions>
  ): Promise<Entity[]> {
    const { skip, limit, sort } = {
      skip: 0,
      limit: 250,
      ...options,
    };

    try {
      this.logger.info(`Querying ${this.modelName}`, { query, options });
      return this.model
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec() as unknown as Entity[];
    } catch (err) {
      throw err;
    }
  }

  public async findOne(query: any): Promise<Entity | null> {
    try {
      this.logger.info(`Querying ${this.modelName}`, { query });
      const result = (await this.model
        .findOne(query)
        .lean()
        .exec()) as unknown as Entity | null;
      this.logger.info('Got result from query', { result });
      return result;
    } catch (err) {
      this.logger.error(
        `Error on collection:${this.model.collection.name} performing findOne() query`,
        err
      );
      throw new Error(`Error performing requested operation`);
    }
  }
}
