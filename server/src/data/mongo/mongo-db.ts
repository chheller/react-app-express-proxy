import * as mongoose from 'mongoose';
import configuration from '../../config/configuration';
import { provideSingleton } from '../../ioc';
import Logger from '../../log/logger';

const logger = Logger.child({ name: 'MongoDB' });

@provideSingleton(MongoDbConnection)
export class MongoDbConnection {
    public db: mongoose.Connection;
    private readonly connectionString: string = `mongodb://${configuration.mongo.hostname}:${configuration.mongo.port}`;

    constructor() {
        logger.info(`connecting to ${this.connectionString} MongoDb`);
        this.db = mongoose.createConnection(this.connectionString);
    }
}
