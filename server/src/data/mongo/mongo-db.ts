import { createConnection } from 'mongoose';
import configuration from '../../config/configuration';
import Logger from '../../log/logger';

const logger = Logger.child({ name: 'MongoDB' });

const {
    mongo: { hostname, port, username, password },
} = configuration;

export class MongoDbConnection {
    private static readonly connectionString: string = `mongodb://${hostname}:${port}`;

    constructor() {}

    static async getConnection() {
        try {
            logger.info(
                `Connecting to ${MongoDbConnection.connectionString} MongoDb`
            );
            return createConnection(MongoDbConnection.connectionString, {
                auth: {
                    user: username,
                    password: password,
                },
            });
        } catch (err) {
            logger.error(`Error connecting to mongo`, err);
        }
    }
}
