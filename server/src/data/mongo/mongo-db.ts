import { createConnection } from 'mongoose';
import configuration from '../../config/configuration';
import Logger from '../../log/logger';

const logger = Logger.child({ name: 'MongoDB' });

export class MongoDbConnection {
    private static readonly connectionString: string = `mongodb://${configuration.mongo.hostname}:${configuration.mongo.port}`;

    constructor() {}

    static async getConnection() {
        try {
            logger.info(
                `Connecting to ${MongoDbConnection.connectionString} MongoDb`
            );
            return createConnection(MongoDbConnection.connectionString);
        } catch (err) {
            logger.error(`Error connecting to mongo`, err);
        }
    }
}
