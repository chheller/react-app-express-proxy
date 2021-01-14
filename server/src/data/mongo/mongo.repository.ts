import { Document, Model, Schema } from 'mongoose';
import { decorate, injectable } from '../../ioc';
import Logger from '../../log/logger';
import { FindOptions, Repository } from '../Repository';
import { MongoDbConnection } from './mongo-db';

export abstract class BaseRepository<Entity = Record<string, any>>
    implements Repository<Entity> {
    protected connection!: MongoDbConnection;
    protected model: Model<Document<Entity>>;
    protected modelName!: string;
    protected schema!: Schema;
    protected logger = Logger.child({ repository: 'base' });
    constructor() {
        this.model = this.connection.db.model(this.modelName, this.schema);
    }

    create(entity: Entity): Promise<Entity> {
        try {
            return (this.model.create(
                new Document(entity)
            ) as unknown) as Promise<Entity>;
        } catch (err) {
            this.logger.error(
                `Error on collection:${this.model.collection.name} performing create() query`
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
            return (this.model
                .find(query)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .lean()
                .exec() as unknown) as Entity[];
        } catch (err) {
            throw err;
        }
    }

    public async findOne(query: any): Promise<Entity> {
        try {
            return (this.model
                .findOne(query)
                .lean()
                .exec() as unknown) as Entity;
        } catch (err) {
            this.logger.error(
                `Error on collection:${this.model.collection.name} performing findOne() query`,
                err
            );
            throw new Error(`Error performing requested operation`);
        }
    }
}

decorate(injectable(), BaseRepository);
