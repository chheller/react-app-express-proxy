import Logger from '../common/logger';
import { CRUDRepository } from './crud-repository';

export abstract class BaseCRUDRepository<EntityType>
  implements CRUDRepository<EntityType>
{
  protected logger = Logger.child({
    name: this.constructor.name,
  });

  public abstract createOne(model: EntityType): Promise<EntityType>;
  public abstract createMany(models: EntityType[]): Promise<EntityType[]>;
  public abstract updateOne(
    query: any,
    model: Partial<EntityType>
  ): Promise<EntityType | null>;
  public abstract updateMany(
    query: any,
    model: EntityType[]
  ): Promise<[number, ...EntityType[]]>;
  public abstract deleteOne(query: any): Promise<void>;
  public abstract deleteMany(query: any): Promise<number>;
  public abstract findMany(
    query: any,
    options?: FindOptions
  ): Promise<EntityType[]>;
  public abstract findOne(query: any): Promise<EntityType | null>;
}

export interface FindOptions {
  skip?: number;
  limit?: number;
  sort?: SortOptions;
}

export type SortOptions =
  | 'asc'
  | 'desc'
  | 'ascending'
  | 'descending'
  | '1'
  | '-1';
