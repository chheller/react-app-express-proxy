import { injectable, unmanaged } from 'inversify';
import { Connection, Document, Model, Schema } from 'mongoose';
import { FindOptions, Repository } from '../Repository';

@injectable()
export abstract class MongoRepository<
  Entity = Record<string, any>
> extends Repository<Entity> {
  protected model: Model<Document<Entity>>;

  constructor(
    protected connection: Connection,
    @unmanaged() protected modelName: string,
    @unmanaged() protected schema: Schema
  ) {
    super();
    this.logger.info(`Creating repository for ${this.modelName} schema.`);
    this.logger.info(this.connection);
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
  async update(query: any, model: Partial<Entity>): Promise<Entity | null> {
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
  async delete(query: any): Promise<number> {
    throw new Error('Method not implemented.');
  }

  public async find(
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
