import { FindOptions } from './base-crud-repository';

export interface CRUDRepository<EntityType> {
  createOne(model: EntityType): Promise<EntityType>;
  createMany(models: EntityType[]): Promise<EntityType[]>;
  updateOne(query: any, model: Partial<EntityType>): Promise<EntityType | null>;
  updateMany(
    query: any,
    model: EntityType[]
  ): Promise<[number, ...EntityType[]]>;
  deleteOne(query: any): Promise<void>;
  deleteMany(query: any): Promise<number>;
  findMany(query: any, options?: FindOptions): Promise<EntityType[]>;
  findOne(query: any): Promise<EntityType | null>;
}
