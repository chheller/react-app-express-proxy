import { injectable, unmanaged } from 'inversify';
import { Connection, Document, Model, Schema } from 'mongoose';
import { BaseCRUDRepository, FindOptions } from '../base-crud-repository';

@injectable()
export class MongoRepository<
  Entity = Record<string, any>
> extends BaseCRUDRepository<Entity> {
  protected model: Model<Document<Entity>>;

  constructor(
    protected connection: Connection,
    @unmanaged() protected modelName: string,
    @unmanaged() protected schema: Schema
  ) {
    super();
    this.logger.debug(`Creating repository for ${this.modelName} schema.`);
    this.model = this.connection.model(this.modelName, this.schema);
    this.logger.debug(
      `Created model for ${this.model.collection.name} collection`
    );
  }

  async createOne(entity: Entity): Promise<Entity> {
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

  public async createMany(entities: Entity[]): Promise<Entity[]> {
    throw new Error('Method not implemented.');
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

  public async findMany(
    query: any,
    options?: Partial<FindOptions>
  ): Promise<Entity[]> {
    const { skip, limit, sort } = {
      skip: 0,
      limit: 25,
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

  async updateOne(query: any, model: Partial<Entity>): Promise<Entity | null> {
    try {
      const doc = await this.model.findOneAndUpdate(query, model);
      return doc?.toJSON() as unknown as Entity;
    } catch (err) {
      this.logger.error(
        `Error on collection:${this.model.collection.name} performing update() query`
      );
      throw new Error('Error performing requested operation');
    }
  }
  async updateMany(
    query: any,
    models: Entity[]
  ): Promise<[number, ...Entity[]]> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(query: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteMany(query: any): Promise<number> {
    throw new Error('Method not implemented.');
  }
}