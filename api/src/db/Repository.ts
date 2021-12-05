import { Connection } from 'mongoose';

export interface Repository<EntityType> {
  create(model: EntityType): Promise<EntityType>;
  update(query: any, model: EntityType): Promise<[number, ...EntityType[]]>;
  delete(query: any): Promise<number>;
  find(query: any, options: FindOptions): Promise<EntityType[]>;
  findOne(query: any, options: FindOptions): Promise<EntityType>;
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
