export interface CRUDRepository<EntityType> {
  createOne(model: EntityType): Promise<EntityType>;
  createMany(models: EntityType[]): Promise<EntityType[]>;
  updateOne(
    query: any,
    model: Partial<EntityType>
  ): Promise<EntityType | undefined | null>;
  updateMany(
    query: any,
    model: EntityType[]
  ): Promise<[number, ...EntityType[]]>;
  deleteOne(query: any): Promise<void>;
  deleteMany(query: any): Promise<number>;
  findMany(query: any, options?: FindOptions): Promise<EntityType[]>;
  findOne(query: any): Promise<EntityType | null>;
}

export interface FindOptions {
  skip?: number;
  limit?: number;
  sort?: SortOptions;
}

export type SortOptions =
  | "asc"
  | "desc"
  | "ascending"
  | "descending"
  | "1"
  | "-1";
