import { Connection } from 'mongoose';
import Logger from '../common/logger';

export abstract class Repository<EntityType> {
  protected logger = Logger.child({
    name: this.constructor.name,
  });
  public abstract create(model: EntityType): Promise<EntityType>;
  public abstract update(
    query: any,
    model: Partial<EntityType>
  ): Promise<EntityType | null>;
  public abstract updateMany(
    query: any,
    model: EntityType[]
  ): Promise<[number, ...EntityType[]]>;
  public abstract delete(query: any): Promise<number>;
  public abstract find(query: any, options: FindOptions): Promise<EntityType[]>;
  public abstract findOne(
    query: any,
    options: FindOptions
  ): Promise<EntityType | null>;
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

export abstract class MongoPersistence {
  abstract getConnection(): Promise<Connection>;
  abstract close(): Promise<void>;
}
