import { injectable, unmanaged } from "inversify";
import { Connection, Model, Schema } from "mongoose";
import { Logger } from "winston";
import { CRUDRepository, FindOptions } from "../crud-repository";

@injectable()
export class MongoRepository<Entity = Record<string, any>>
  implements CRUDRepository<Entity>
{
  constructor(
    protected connectionProvider: () => Promise<Connection>,
    @unmanaged() protected modelName: string,
    @unmanaged() protected schema: Schema,
    @unmanaged() protected logger: Logger
  ) {
    this.logger.debug(`Creating repository for ${this.modelName} schema.`);
  }
  private async getModel(): Promise<Model<Entity>> {
    const connection = await this.connectionProvider();
    return connection.model<Entity>(this.modelName, this.schema);
  }

  async createOne(entity: Entity): Promise<Entity> {
    const model = await this.getModel();
    try {
      const doc = await model.create(new model(entity));
      return doc.toObject();
    } catch (err) {
      this.logger.error(
        `Error on collection:${model.collection.name} performing create() query`,
        err
      );
      throw new Error("Error performing requested operation");
    }
  }

  public async createMany(entities: Entity[]): Promise<Entity[]> {
    const model = await this.getModel();

    throw new Error("Method not implemented.");
  }

  public async findOne(query: any): Promise<Entity | null> {
    const model = await this.getModel();

    try {
      this.logger.info(`Querying ${this.modelName}`, { query });
      const result = (await model
        .findOne(query)
        .lean()
        .exec()) as unknown as Entity | null;
      this.logger.info("Got result from query", { result });
      return result;
    } catch (err) {
      this.logger.error(
        `Error on collection:${model.collection.name} performing findOne() query`,
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
    const model = await this.getModel();

    try {
      this.logger.info(`Querying ${this.modelName}`, { query, options });
      return model
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

  async updateOne(
    query: any,
    entity: Partial<Entity>
  ): Promise<Entity | undefined | null> {
    const model = await this.getModel();

    try {
      const doc = await model.findOneAndUpdate(query, entity);
      return doc?.toObject();
    } catch (err) {
      this.logger.error(
        `Error on collection:${model.collection.name} performing update() query`
      );
      throw new Error("Error performing requested operation");
    }
  }
  async updateMany(
    query: any,
    models: Entity[]
  ): Promise<[number, ...Entity[]]> {
    const model = await this.getModel();

    throw new Error("Method not implemented.");
  }

  async deleteOne(query: any): Promise<void> {
    const model = await this.getModel();

    throw new Error("Method not implemented.");
  }

  async deleteMany(query: any): Promise<number> {
    const model = await this.getModel();

    throw new Error("Method not implemented.");
  }
}
